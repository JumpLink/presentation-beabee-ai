// German translations
export const translations = {
    slides: {
        calloutCreation: {
            title: 'Callout-Erstellung mit KI',
            userMessage: 'Erstelle bitte ein Callout zum Thema "Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?"',
            calloutPreview: {
                title: 'Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?',
                description: 'Rechter Populismus ist in Deutschland zunehmend präsent – in sozialen Medien, auf Demonstrationen und in der Politik. Er beeinflusst die öffentliche Meinung und das politische Klima.',
                questions: [
                    {
                        text: 'Welche Veränderungen in der politischen Debatte hast du wahrgenommen?',
                        type: '(Freitext)'
                    },
                    {
                        text: 'Welche Rolle spielen soziale Medien für die Verbreitung rechter populistischer Narrative?',
                        type: '(Mehrfachauswahl)'
                    },
                    {
                        text: 'Wie sollten Medien mit rechten populistischen Aussagen umgehen?',
                        type: '(Freitext)'
                    },
                    {
                        text: 'Wie hat sich dein Umgang mit politischen Diskussionen verändert?',
                        type: '(Skala 1-10)'
                    }
                ]
            }
        },
        exampleResponses: {
            title: 'Beispiel-Antworten generieren',
            userMessage: 'Generiere bitte einige Beispiel-Antworten für @Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland? mit unterschiedlichen Perspektiven.',
            responses: [
                {
                    type: 'Besorgt, faktenorientiert',
                    content: 'Mir fällt auf, dass rechte Parolen salonfähiger geworden sind. Themen wie Migration oder Gender werden zunehmend aggressiver diskutiert, oft mit falschen oder manipulierten Fakten. Besonders beunruhigend ist, dass Verschwörungstheorien immer mehr Anklang finden und Politiker:innen Angst haben, sich klar gegen rechte Hetze zu positionieren.'
                },
                {
                    type: 'Relativierend, neutral',
                    content: 'Ich sehe durchaus eine Verschiebung im Diskurs, aber nicht nur auf der rechten Seite. Auch linke Gruppen werden lauter, und es gibt zunehmend Polarisierung auf beiden Seiten. Soziale Medien verstärken das, weil extreme Meinungen dort mehr Aufmerksamkeit bekommen.'
                },
                {
                    type: 'Populistisch, verschwörungstheoretisch',
                    content: 'Die etablierten Medien verdrehen die Wahrheit, um rechte Stimmen zu unterdrücken. Zum Glück gibt es das Internet, wo Menschen endlich die Wahrheit sagen können! Früher gab es nur eine Meinung, heute kann jeder selbst nachdenken und erkennen, was wirklich passiert.'
                },
                {
                    type: 'Persönliche Erfahrung, aktivistisch',
                    content: 'Ich war lange unpolitisch, aber seit ich sehe, wie rechte Narrative verbreitet werden, engagiere ich mich mehr. Ich diskutiere mit Freund:innen, gehe zu Demos und versuche, Fake News zu entlarven. Besonders wichtig ist, dass Journalist:innen klar Stellung beziehen und Fakten gegen rechte Desinformation setzen.'
                }
            ]
        },
        aiAnalysis: {
            title: 'KI-Analyse Beispiel',
            userMessage: 'Welche Veränderungen in der politischen Debatte werden im @Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland? am häufigsten genannt? Schaue dir dazu alle Antworten zu @Frage: 1 an. Kannst du sie in positive, negative und neutrale Wahrnehmungen einteilen?',
            analysis: {
                negative: [
                    'Normalisierung rechter Rhetorik (●●●●)',
                    'Aggressivere Diskussionskultur (●●●)',
                    'Verbreitung von Falschinformationen (●●●)'
                ],
                neutral: [
                    'Allgemeine Diskursverschiebung (●●●)',
                    'Verstärkung durch soziale Medien (●●●)'
                ],
                positive: [
                    'Verstärktes politisches Engagement (●●)',
                    'Bewusstsein für Desinformation (●●)'
                ]
            }
        },
        translation: {
            title: 'KI-Übersetzung Beispiel',
            userMessage: 'Bitte übersetze alle Antworten zu @Frage: 1 auf englisch'
        },
        imageGeneration: {
            title: 'KI-Bildgenerierung Beispiel',
            userMessage: 'Bitte erstelle ein passendes Teaser-Bild für @Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?'
        }
    },
    common: {
        placeholder: 'Schreibe eine Nachricht...',
        sendButton: 'Senden',
        saveButton: 'Speichern',
        confirmationMessage: '✅ Erfolgreich gespeichert.',
        errorMessage: '❌ Ein Fehler ist aufgetreten.'
    }
}; 