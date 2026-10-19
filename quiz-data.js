'use strict';
window.WorkshopQuizzes = {
  "1": {
    "title": "À deux, on voit plus juste",
    "reflection": "Aujourd’hui, à quel moment ton binôme t’a-t-il aidé à mieux comprendre ou à vérifier ?",
    "questions": [
      {
        "title": "Deux mesures différentes",
        "skills": "Rigueur · coopération",
        "situation": "Ton binôme et toi obtenez deux mesures différentes pour la même pièce. Tu proposes de…",
        "options": [
          "Garder la mesure de la personne qui utilise le mieux l’outil.",
          "Reprendre ensemble la mesure en comparant les points de départ, la lecture et les unités.",
          "Faire la moyenne des deux valeurs pour continuer."
        ],
        "preferred": 1,
        "feedback": [
          "L’expérience est utile, mais elle ne permet pas d’expliquer l’écart. Vérifiez la méthode ensemble.",
          "Vous cherchez l’origine de l’écart avant de retenir une valeur.",
          "La moyenne donne un nouveau nombre, mais elle peut masquer une erreur de mesure."
        ]
      },
      {
        "title": "Une consigne pas très claire",
        "skills": "Respect des consignes · communication",
        "situation": "Tu comprends le résultat attendu, mais une étape de la consigne reste floue. Tu…",
        "options": [
          "Expliques ce que tu as compris et demandes une précision sur cette étape.",
          "Commences comme tu le penses et demandes une vérification à la fin.",
          "Regardes comment un autre binôme s’y prend et fais pareil."
        ],
        "preferred": 0,
        "feedback": [
          "Ta question est précise : le formateur peut clarifier ce qui te manque avant que tu agisses.",
          "Tu avances, mais une mauvaise interprétation peut t’obliger à recommencer.",
          "Observer peut aider, mais l’autre binôme peut aussi avoir mal compris."
        ]
      },
      {
        "title": "Qui fait quoi ?",
        "skills": "Coopération · engagement",
        "situation": "Ton binôme maîtrise mieux l’ordinateur et propose de tout faire pour gagner du temps. Tu…",
        "options": [
          "Le laisses manipuler pendant que tu observes toute l’activité.",
          "Prends la souris pour réaliser ta moitié sans son aide.",
          "Proposes d’alterner : l’un manipule, l’autre guide et vérifie, puis vous échangez."
        ],
        "preferred": 2,
        "feedback": [
          "Observer aide à comprendre, mais tu as aussi besoin d’essayer.",
          "Chacun participe, mais vous perdez l’occasion de vous aider pendant la manipulation.",
          "Chacun essaie, explique et contribue à la vérification."
        ]
      },
      {
        "title": "Les cotes du plan concordent-elles ?",
        "skills": "Lecture de plan · contrôle des données",
        "situation": "Un plan indique trois hauteurs : 1 100 mm, 1 500 mm et 1 100 mm. La hauteur totale annoncée est de 3 600 mm. Que constates-tu ?",
        "options": [
          "La somme est de 3 700 mm : il y a un écart de 100 mm à clarifier.",
          "La somme est de 3 600 mm : les cotes concordent.",
          "Il suffit de choisir la hauteur totale et d’ignorer les autres cotes."
        ],
        "preferred": 0,
        "feedback": [
          "1 100 + 1 500 + 1 100 = 3 700 mm. Cela dépasse de 100 mm la hauteur totale annoncée. Il faut clarifier le plan avant de le valider.",
          "Refais l’addition : elle donne 3 700 mm, et non 3 600 mm. Une cote affichée ne dispense pas du contrôle.",
          "Les cotes se contredisent. Sans clarification, tu ne sais pas laquelle doit être corrigée."
        ],
        "type": "knowledge"
      }
    ]
  },
  "2": {
    "title": "Avant d’agir, je vérifie",
    "reflection": "Quelle vérification as-tu faite aujourd’hui avant de poursuivre ?",
    "questions": [
      {
        "title": "Prêt à lancer ?",
        "skills": "Anticipation · responsabilité",
        "situation": "Tout semble prêt. Tu ne sais pas si la vérification demandée avant le lancement a été faite. Tu…",
        "options": [
          "Lances, puisque personne n’a signalé de souci.",
          "Demandes confirmation et attends la validation prévue.",
          "Demandes à ton binôme de lancer, puisqu’il est plus à l’aise."
        ],
        "preferred": 1,
        "feedback": [
          "L’absence de remarque ne confirme pas que le contrôle a été réalisé.",
          "Tu lèves le doute avant d’engager l’action.",
          "Changer de personne ne remplace pas la vérification attendue."
        ]
      },
      {
        "title": "Une observation à expliquer",
        "skills": "Observation · communication",
        "situation": "Le formateur demande ce que tu as remarqué pendant la démonstration. Tu n’es pas certain de ton explication. Tu…",
        "options": [
          "Décris ce que tu as vu, puis précises ce qui reste une hypothèse.",
          "Donnes l’explication qui te semble la plus logique sans exprimer ton doute.",
          "Reprends l’explication de ton binôme, même si tu ne la comprends pas encore."
        ],
        "preferred": 0,
        "feedback": [
          "Tu distingues ton observation de ton interprétation. Cela permet d’en discuter.",
          "Une explication plausible mérite aussi d’être vérifiée.",
          "Demande à ton binôme de t’expliquer son raisonnement avant de le reprendre."
        ]
      },
      {
        "title": "Pendant l’attente",
        "skills": "Organisation · initiative",
        "situation": "La machine travaille. Tu as du temps avant la prochaine étape. Tu…",
        "options": [
          "Attends près de la machine jusqu’à la fin.",
          "Commences une nouvelle tâche sans en parler au binôme.",
          "Vérifies ce qu’il reste à préparer et conviens avec ton binôme d’une tâche utile."
        ],
        "preferred": 2,
        "feedback": [
          "Observer peut être utile. Demande-toi aussi ce que tu pourrais préparer pendant ce temps.",
          "Tu prends une initiative, mais ton binôme risque de perdre le fil.",
          "Tu utilises l’attente pour anticiper, en gardant une organisation commune."
        ]
      },
      {
        "title": "Du modèle à l’objet",
        "skills": "Acculturation numérique · chaîne de fabrication",
        "situation": "Quel enchaînement décrit le passage de la brique numérique à la pièce imprimée ?",
        "options": [
          "L’imprimante lit directement le plan papier et choisit les dimensions.",
          "Fusion sert à modéliser ; Bambu Studio prépare les instructions ; l’imprimante fabrique la pièce.",
          "Bambu Studio vérifie automatiquement que toutes les cotes du plan sont justes."
        ],
        "preferred": 1,
        "feedback": [
          "Le plan doit être interprété et le modèle préparé. L’imprimante ne choisit pas elle-même les dimensions à partir du papier.",
          "Chaque outil a un rôle distinct : créer la géométrie, préparer l’impression, puis fabriquer. Les contrôles restent nécessaires.",
          "Le logiciel prépare l’impression ; il ne garantit pas que ton modèle correspond au plan. Il faut comparer les cotes."
        ],
        "type": "knowledge"
      }
    ]
  },
  "3": {
    "title": "J’essaie, j’ajuste, je progresse",
    "reflection": "Quelle remarque ou quel essai t’a permis de progresser aujourd’hui ?",
    "questions": [
      {
        "title": "Une remarque sur ton travail",
        "skills": "Écoute · adaptation",
        "situation": "Tu pensais avoir terminé. Ton binôme te signale un écart avec la consigne. Tu…",
        "options": [
          "Demandes de te montrer l’écart, le vérifies et essaies une correction.",
          "Recommences tout pour être certain de ne rien laisser passer.",
          "Expliques pourquoi tu as fait ainsi, puis conserves ton travail sans vérifier."
        ],
        "preferred": 0,
        "feedback": [
          "Tu utilises la remarque pour contrôler et corriger ce qui en a besoin.",
          "Recommencer peut être nécessaire, mais commence par localiser l’écart.",
          "Expliquer ton choix est utile. Cela ne remplace pas sa comparaison avec la consigne."
        ]
      },
      {
        "title": "Tu bloques",
        "skills": "Autonomie · demande d’aide",
        "situation": "Après deux essais, tu bloques toujours à la même étape. Tu…",
        "options": [
          "Demandes au formateur de terminer cette partie à ta place.",
          "Continues à modifier plusieurs choses pour voir si cela fonctionne.",
          "Montres ce que tu veux obtenir, ce que tu as essayé et l’endroit où tu bloques."
        ],
        "preferred": 2,
        "feedback": [
          "Tu obtiendras peut-être le résultat, mais tu risques de ne pas comprendre comment poursuivre seul.",
          "Plusieurs changements simultanés rendent leur effet difficile à comprendre.",
          "Ta demande permet une aide ciblée tout en te laissant acteur de la tâche."
        ]
      },
      {
        "title": "Le temps se raccourcit",
        "skills": "Gestion du temps · respect des consignes",
        "situation": "Il reste peu de temps. Les vérifications obligatoires ne sont pas terminées et tu voudrais encore personnaliser ta pièce. Tu…",
        "options": [
          "Termines la personnalisation, puis vérifies s’il reste du temps.",
          "Fais les vérifications obligatoires et gardes la personnalisation pour après, si possible.",
          "Fais rapidement les deux en réduisant chaque vérification."
        ],
        "preferred": 1,
        "feedback": [
          "Tu privilégies une envie au risque de laisser les exigences essentielles sans contrôle.",
          "Tu hiérarchises les tâches selon ce qui est nécessaire.",
          "Aller plus vite ne garantit pas que les contrôles restent suffisants."
        ]
      },
      {
        "title": "Le modèle est prêt. Et la pièce ?",
        "skills": "Modélisation numérique · contrôle du tendeur",
        "situation": "À la fin de la demi-journée 3, le modèle du tendeur est contrôlé et l’impression est lancée. Que peux-tu affirmer ?",
        "options": [
          "Le tendeur fonctionne forcément puisque le modèle est affiché en 3D.",
          "La personnalisation suffit à valider l’usage du tendeur.",
          "Le modèle a été contrôlé ; il faudra encore mesurer et tester la pièce imprimée lors de la demi-journée 4."
        ],
        "preferred": 2,
        "feedback": [
          "L’affichage du modèle ne prouve pas le fonctionnement de la pièce réelle. L’impression et l’usage doivent encore être contrôlés.",
          "La personnalisation concerne l’apparence. Elle ne remplace pas la vérification des dimensions et de l’usage.",
          "Tu distingues le contrôle numérique du test réel. Le débriefing de la pièce imprimée aura lieu au début de la demi-journée 4."
        ],
        "type": "knowledge"
      }
    ]
  },
  "4": {
    "title": "Je teste, puis j’explore l’IA",
    "reflection": "Qu’as-tu vérifié sur le tendeur imprimé ? Quel contrôle veux-tu garder lorsque tu utilises l’IA ?",
    "questions": [
      {
        "title": "Le tendeur paraît réussi",
        "skills": "Esprit critique · contrôle",
        "situation": "Au début de la demi-journée 4, tu récupères le tendeur imprimé. Il paraît réussi. Ton binôme propose de le tester. Tu…",
        "options": [
          "Vérifies seulement son apparence.",
          "Le déclares terminé parce que l’impression est allée jusqu’au bout.",
          "Compares les dimensions aux valeurs prévues et testes son usage avec ton binôme."
        ],
        "preferred": 2,
        "feedback": [
          "L’apparence ne suffit pas à confirmer les dimensions et le fonctionnement.",
          "Une impression terminée n’est pas forcément une pièce conforme. Le contrôle reste à faire.",
          "Vous confrontez le résultat réel aux attentes et pouvez expliquer les écarts éventuels."
        ]
      },
      {
        "title": "Des informations pour essayer",
        "skills": "Responsabilité · protection des données",
        "situation": "Pour tester ton appli, tu disposes d’une vraie fiche client avec son nom, son adresse et son téléphone. Tu…",
        "options": [
          "Crées un exemple fictif avec uniquement les informations utiles au test.",
          "Supprimes le nom et gardes les autres coordonnées.",
          "Utilises la fiche complète, puisque le test reste dans l’atelier."
        ],
        "preferred": 0,
        "feedback": [
          "Tu peux tester le fonctionnement sans transmettre les coordonnées du client.",
          "Une adresse ou un téléphone peuvent encore permettre d’identifier la personne.",
          "Le contexte de l’atelier ne suffit pas à justifier le partage de ces informations avec l’outil."
        ]
      },
      {
        "title": "Un désaccord avec ton binôme",
        "skills": "Communication · coopération",
        "situation": "Ton binôme veut une appli très complète. Tu préfères une version simple que vous pourrez tester dans le temps disponible. Tu…",
        "options": [
          "Commences ta version de ton côté pour ne pas perdre de temps.",
          "Proposes de définir ensemble une fonction indispensable, puis d’ajouter le reste si elle fonctionne.",
          "Demandes à l’IA de choisir qui a raison."
        ],
        "preferred": 1,
        "feedback": [
          "Tu avances, mais vous risquez de travailler dans deux directions différentes.",
          "Vous vous accordez sur une priorité et un résultat vérifiable.",
          "L’IA peut suggérer des options. Le choix doit tenir compte de votre besoin et de vos contraintes."
        ]
      },
      {
        "title": "Quel rôle garder face à l’IA ?",
        "skills": "Acculturation à l’IA · esprit critique",
        "situation": "L’IA génère une application à partir de ta demande. Qui doit vérifier qu’elle répond au besoin et que ses résultats sont corrects ?",
        "options": [
          "L’IA seule, puisqu’elle a produit le code.",
          "Le binôme, avec l’aide du formateur, en comparant à des consignes et à des résultats connus.",
          "Personne, si les boutons fonctionnent et que la présentation est claire."
        ],
        "preferred": 1,
        "feedback": [
          "Produire le code ne garantit pas sa justesse. L’IA peut se tromper ou mal interpréter la demande.",
          "Vous gardez la responsabilité du contrôle : besoin, consignes, données, calculs et essais. L’IA vous aide à produire et à corriger.",
          "Une interface utilisable peut afficher un résultat faux. Il faut aussi tester ce que l’application calcule ou permet de faire."
        ],
        "type": "knowledge"
      }
    ]
  },
  "5": {
    "title": "Je montre ce que j’ai appris",
    "reflection": "Quelle découverte numérique et quelle méthode de vérification veux-tu réutiliser en formation de maçon ? Donne un exemple.",
    "questions": [
      {
        "title": "Un test qui surprend",
        "skills": "Écoute · retour constructif",
        "situation": "Un autre binôme ne comprend pas comment utiliser votre appli. Chez vous, tout semblait clair. Tu…",
        "options": [
          "Lui expliques chaque clic pour qu’il termine le test.",
          "Lui montres rapidement le résultat attendu et passes au bilan.",
          "Lui demandes de montrer où il bloque, observes, puis testes une amélioration avec lui."
        ],
        "preferred": 2,
        "feedback": [
          "Tu aides à terminer, mais tu ne sauras pas si l’appli peut être comprise sans toi.",
          "Montrer le résultat ne permet pas de comprendre la difficulté rencontrée.",
          "Tu transformes le retour en une amélioration que vous pouvez vérifier."
        ]
      },
      {
        "title": "« Ça fonctionne »",
        "skills": "Contrôle · argumentation",
        "situation": "Tu présentes ta réalisation. Le formateur te demande : « Comment sais-tu qu’elle fonctionne ? » Tu…",
        "options": [
          "Expliques le test effectué, le résultat attendu et ce que tu as obtenu.",
          "Dis que ton binôme et toi êtes satisfaits du résultat.",
          "Montres qu’elle ressemble à l’exemple de départ."
        ],
        "preferred": 0,
        "feedback": [
          "Tu appuies ta conclusion sur une vérification que les autres peuvent comprendre.",
          "Votre satisfaction compte, mais elle ne décrit pas le contrôle réalisé.",
          "La ressemblance ne suffit pas à vérifier l’usage attendu."
        ]
      },
      {
        "title": "Ce que tu emportes",
        "skills": "Prise de recul · transfert",
        "situation": "Pour ton bilan, quelle réponse montre le mieux ce que tu peux réutiliser ?",
        "options": [
          "« J’ai découvert plusieurs outils numériques. »",
          "« Quand deux résultats diffèrent, je compare les méthodes avant de choisir. Je pourrai le refaire lors d’un contrôle de mesure. »",
          "« J’ai terminé toutes les activités. »"
        ],
        "preferred": 1,
        "feedback": [
          "Tu cites une découverte. Ajoute un exemple de ce que tu sais mieux faire.",
          "Tu nommes une méthode et une situation où tu pourrais la réutiliser.",
          "Tu cites un résultat. Explique aussi comment tu as travaillé pour l’obtenir."
        ]
      },
      {
        "title": "Comprendre la règle de trois",
        "skills": "Proportionnalité · vérification d’un calcul numérique",
        "situation": "Dans un exercice simplifié, 4 m² de mur nécessitent 50 blocs. Avec les mêmes blocs et la même pose, sans ouvertures ni réserve, combien en faut-il pour 10 m² ?",
        "options": [
          "125 blocs : 50 ÷ 4 × 10.",
          "56 blocs : 50 + (10 − 4).",
          "200 blocs : 50 × 4."
        ],
        "preferred": 0,
        "feedback": [
          "On cherche d’abord la quantité pour 1 m² : 50 ÷ 4 = 12,5. Puis pour 10 m² : 12,5 × 10 = 125 blocs. La proportion est conservée.",
          "Ajouter la différence de surface au nombre de blocs mélange deux unités. Il faut multiplier par le rapport des surfaces : 10 ÷ 4.",
          "Multiplier par 4 ne correspond pas au passage de 4 m² à 10 m². Le calcul est 50 × 10 ÷ 4 = 125 blocs."
        ],
        "type": "knowledge"
      }
    ]
  }
};
