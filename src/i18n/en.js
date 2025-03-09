// English translations
export const translations = {
    slides: {
        calloutCreation: {
            title: 'Callout Creation with AI',
            userMessage: 'Please create a callout about "How does right-wing populism influence political debate in Germany?"',
            calloutPreview: {
                title: 'How does right-wing populism influence political debate in Germany?',
                description: 'Right-wing populism is increasingly present in Germany - in social media, at demonstrations, and in politics. It influences public opinion and the political climate.',
                questions: [
                    {
                        text: 'What changes have you noticed in political debate?',
                        type: '(Free text)'
                    },
                    {
                        text: 'What role do social media play in spreading right-wing populist narratives?',
                        type: '(Multiple choice)'
                    },
                    {
                        text: 'How should media handle right-wing populist statements?',
                        type: '(Free text)'
                    },
                    {
                        text: 'How has your approach to political discussions changed?',
                        type: '(Scale 1-10)'
                    }
                ]
            }
        },
        exampleResponses: {
            title: 'Generate Example Responses',
            userMessage: 'Please generate some example responses for @Callout: How does right-wing populism influence political debate in Germany? with different perspectives.',
            responses: [
                {
                    type: 'Concerned, fact-oriented',
                    content: 'I notice that right-wing slogans have become more acceptable. Topics like migration or gender are discussed more aggressively, often with false or manipulated facts. Particularly concerning is that conspiracy theories are finding more acceptance and politicians are afraid to take a clear stand against right-wing agitation.'
                },
                {
                    type: 'Relativizing, neutral',
                    content: 'I see a shift in discourse, but not just on the right. Left-wing groups are also getting louder, and there\'s increasing polarization on both sides. Social media amplifies this because extreme opinions get more attention there.'
                },
                {
                    type: 'Populist, conspiracy-theoretical',
                    content: 'The established media distort the truth to suppress right-wing voices. Thankfully, there\'s the internet where people can finally tell the truth! In the past, there was only one opinion, today everyone can think for themselves and see what\'s really happening.'
                },
                {
                    type: 'Personal experience, activist',
                    content: 'I was apolitical for a long time, but since I see how right-wing narratives are spread, I\'m more engaged. I discuss with friends, go to demonstrations, and try to expose fake news. It\'s particularly important that journalists take a clear position and counter right-wing disinformation with facts.'
                }
            ]
        },
        aiAnalysis: {
            title: 'AI Analysis Example',
            userMessage: 'What changes in political debate are most frequently mentioned in @Callout: How does right-wing populism influence political debate in Germany? Look at all answers to @Question: 1. Can you categorize them into positive, negative, and neutral perceptions?',
            analysis: {
                negative: [
                    'Normalization of right-wing rhetoric (●●●●)',
                    'More aggressive discussion culture (●●●)',
                    'Spread of false information (●●●)'
                ],
                neutral: [
                    'General discourse shift (●●●)',
                    'Amplification through social media (●●●)'
                ],
                positive: [
                    'Increased political engagement (●●)',
                    'Awareness of disinformation (●●)'
                ]
            }
        },
        translation: {
            title: 'AI Translation Example',
            userMessage: 'Please translate all answers to @Question: 1 to English'
        },
        imageGeneration: {
            title: 'AI Image Generation Example',
            userMessage: 'Please create a suitable teaser image for @Callout: How does right-wing populism influence political debate in Germany?'
        }
    },
    common: {
        placeholder: 'Write a message...',
        sendButton: 'Send',
        saveButton: 'Save',
        confirmationMessage: '✅ Successfully saved.',
        errorMessage: '❌ An error occurred.'
    }
}; 