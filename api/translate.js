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

        // OpenAI API 호출 (한 번에 제목과 본문 번역)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                        content: `당신은 전문 번역가입니다. 주어진 이메일의 제목과 본문을 ${targetLanguage}로 자연스럽게 번역해주세요. 격식있는 비즈니스 이메일 톤을 유지하세요.`
                    },
                    {
                        role: 'user',
                        content: `다음 이메일을 번역해주세요.\n\n제목: ${subject || '(없음)'}\n\n본문:\n${body || '(없음)'}`
                    }
                ],
                tools: [
                    {
                        type: 'function',
                        function: {
                            name: 'return_translation',
                            description: '번역된 이메일 제목과 본문을 반환합니다.',
                            parameters: {
                                type: 'object',
                                properties: {
                                    subject: {
                                        type: 'string',
                                        description: '번역된 이메일 제목'
                                    },
                                    body: {
                                        type: 'string',
                                        description: '번역된 이메일 본문'
                                    }
                                },
                                required: ['subject', 'body']
                            }
                        }
                    }
                ],
                tool_choice: { type: 'function', function: { name: 'return_translation' } },
                temperature: 0.3,
                max_tokens: 2500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API 오류: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        // function call 결과 파싱
        const toolCall = data.choices[0].message.tool_calls?.[0];
        if (!toolCall || toolCall.function.name !== 'return_translation') {
            throw new Error('번역 결과를 파싱할 수 없습니다.');
        }

        const translation = JSON.parse(toolCall.function.arguments);

        // 결과 반환
        return res.status(200).json({
            subject: translation.subject || subject,
            body: translation.body || body,
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
