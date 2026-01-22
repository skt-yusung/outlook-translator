// Vercel Serverless Function for OpenAI Translation
export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // OPTIONS 요청 처리 (CORS preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // POST 요청만 허용
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { subject, body, targetLang } = req.body;

        // 입력 검증
        if (!subject && !body) {
            return res.status(400).json({ error: '번역할 내용이 없습니다.' });
        }

        if (!targetLang || !['ko', 'en'].includes(targetLang)) {
            return res.status(400).json({ error: '잘못된 목표 언어입니다.' });
        }

        // OpenAI API 키 확인
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다.' });
        }

        // 번역 프롬프트 생성
        const targetLanguage = targetLang === 'ko' ? '한국어' : '영어';
        const systemPrompt = `당신은 전문 번역가입니다. 주어진 텍스트를 ${targetLanguage}로 자연스럽게 번역해주세요. 격식있는 비즈니스 이메일 톤을 유지하세요.`;

        // OpenAI API 호출 (제목)
        let translatedSubject = '';
        if (subject && subject.trim()) {
            const subjectResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: `다음 이메일 제목을 번역해주세요:\n\n${subject}`
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 200
                })
            });

            if (!subjectResponse.ok) {
                const errorData = await subjectResponse.json();
                throw new Error(`OpenAI API 오류 (제목): ${errorData.error?.message || subjectResponse.statusText}`);
            }

            const subjectData = await subjectResponse.json();
            translatedSubject = subjectData.choices[0].message.content.trim();
        }

        // OpenAI API 호출 (본문)
        let translatedBody = '';
        if (body && body.trim()) {
            const bodyResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: `다음 이메일 본문을 번역해주세요:\n\n${body}`
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 2000
                })
            });

            if (!bodyResponse.ok) {
                const errorData = await bodyResponse.json();
                throw new Error(`OpenAI API 오류 (본문): ${errorData.error?.message || bodyResponse.statusText}`);
            }

            const bodyData = await bodyResponse.json();
            translatedBody = bodyData.choices[0].message.content.trim();
        }

        // 결과 반환
        return res.status(200).json({
            subject: translatedSubject || subject,
            body: translatedBody || body,
            targetLang
        });

    } catch (error) {
        console.error('Translation error:', error);
        return res.status(500).json({ 
            error: '번역 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
}
