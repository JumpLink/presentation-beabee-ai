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
                ],
                previewTitle: 'Callout-Vorschlag',
                introText: 'Ich habe einen Callout zum Thema',
                questionsTitle: 'Beantworten Sie folgende Fragen:',
                confirmText: 'Möchten Sie diesen Callout in Beabee anlegen?',
                userConfirmation: 'Ja, bitte anlegen.',
                successText: 'Sie können die Antworten jederzeit über das @Callout-Tag in unseren Chats analysieren.'
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
            ],
            confirmText: 'Möchtest du diese Beispiel-Antworten für Demonstrationszwecke in den Callout einfügen?',
            successText: 'Du kannst sie jetzt für Analysen und Demonstrationen verwenden. Die Antworten decken verschiedene Perspektiven ab und eignen sich gut, um die Funktionen der KI-Analyse zu zeigen.',
            userConfirmation: 'Ja, bitte füge sie ein.'
        },
        aiAnalysis: {
            title: 'KI-Analyse Beispiel',
            userMessage: 'Welche Veränderungen in der politischen Debatte werden im @Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland? am häufigsten genannt? Schaue dir dazu alle Antworten zu @Frage: 1 an. Kannst du sie in positive, negative und neutrale Wahrnehmungen einteilen?',
            analysis: {
                title: 'Analyse der Veränderungen in der politischen Debatte',
                intro: 'Basierend auf den Antworten zur Frage 1 lassen sich folgende Wahrnehmungen identifizieren:',
                categories: {
                    negative: {
                        title: 'Negative Wahrnehmungen:',
                        items: [
                            'Normalisierung rechter Rhetorik (●●●●)',
                            'Aggressivere Diskussionskultur (●●●)',
                            'Verbreitung von Falschinformationen (●●●)'
                        ]
                    },
                    neutral: {
                        title: 'Neutrale Wahrnehmungen:',
                        items: [
                            'Allgemeine Diskursverschiebung (●●●)',
                            'Verstärkung durch soziale Medien (●●●)'
                        ]
                    },
                    positive: {
                        title: 'Positive Wahrnehmungen:',
                        items: [
                            'Verstärktes politisches Engagement (●●)',
                            'Bewusstsein für Desinformation (●●)'
                        ]
                    }
                },
                conclusion: 'Die Analyse zeigt, dass die Veränderungen überwiegend negativ wahrgenommen werden, insbesondere die Normalisierung rechter Rhetorik und die aggressivere Diskussionskultur.'
            }
        },
        translation: {
            title: 'KI-Übersetzung Beispiel',
            userMessage: 'Bitte übersetze alle Antworten zu @Frage: 1 auf englisch',
            translationPreview: {
                title: 'Übersetzung der Antworten',
                intro: 'Hier sind die übersetzten Antworten:',
                questionContext: 'Hier sind die übersetzten Antworten zu Frage 1 "Welche Veränderungen in der politischen Debatte hast du wahrgenommen?":',
                exampleTitle: 'Übersetzte Antworten (Beispiel):',
                exampleTranslation: '"I\'ve noticed that right-wing rhetoric has become increasingly normalized in public discourse. Terms and positions that would have been considered extreme a few years ago are now part of everyday political discussions."',
                conclusion: 'Alle Antworten wurden ins Englische übersetzt, wobei die ursprüngliche Bedeutung und der Kontext erhalten geblieben sind.',
                confirmText: 'Möchtest du die Übersetzungen speichern?',
                userConfirmation: 'Ja, bitte speichern.',
                successText: 'Die Übersetzungen wurden gespeichert und können jetzt verwendet werden.'
            }
        },
        imageGeneration: {
            title: 'KI-Bildgenerierung Beispiel',
            userMessage: 'Bitte erstelle ein passendes Teaser-Bild für @Callout: Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?',
            imagePreview: {
                title: 'Generiertes Bild',
                intro: 'Ich habe folgendes Bild erstellt:',
                description: 'Das Bild zeigt eine symbolische Darstellung der politischen Debatte in Deutschland.',
                confirmText: 'Möchtest du dieses Bild als Teaser verwenden?',
                userConfirmation: 'Ja, bitte verwenden.',
                successText: 'Das Bild wurde als Teaser für den Callout gespeichert.'
            }
        }
    },
    common: {
        placeholder: 'Schreibe eine Nachricht...',
        sendButton: 'Senden',
        saveButton: 'Speichern',
        confirmationMessage: '✅ Erfolgreich gespeichert.',
        errorMessage: '❌ Ein Fehler ist aufgetreten.',
        toolbar: {
            callout: 'Callout',
            question: 'Frage',
            callouts: [
                {
                    text: 'Wie beeinflusst rechter Populismus die politische Debatte in Deutschland?',
                    shortTitle: 'Populismus in der Debatte'
                },
                {
                    text: 'Klimawandel und persönliche Verantwortung',
                    shortTitle: 'Klimawandel Verantwortung'
                },
                {
                    text: 'Digitalisierung im Gesundheitswesen',
                    shortTitle: 'Digitalisierung Gesundheit'
                }
            ],
            questions: [
                {
                    text: 'Welche Veränderungen in der politischen Debatte hast du wahrgenommen?',
                    shortTitle: 'Debattenveränderungen'
                },
                {
                    text: 'Welche Rolle spielen soziale Medien für die Verbreitung rechter populistischer Narrative?',
                    shortTitle: 'Rolle sozialer Medien'
                },
                {
                    text: 'Wie sollten Medien mit rechten populistischen Aussagen umgehen?',
                    shortTitle: 'Medienumgang'
                },
                {
                    text: 'Wie hat sich dein Umgang mit politischen Diskussionen verändert?',
                    shortTitle: 'Diskussionsveränderungen'
                }
            ]
        },
        ui: {
            exampleResponsesTitle: 'Beispiel-Antworten',
            created: 'erstellt. Hier ist der Vorschlag:'
        }
    }
}; 