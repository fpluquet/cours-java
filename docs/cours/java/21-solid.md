# Les principes SOLID

Les principes **SOLID** sont cinq règles fondamentales de la programmation orientée objet. Ils servent de guide pour concevoir des logiciels robustes, évolutifs et faciles à maintenir. Bien appliqués, ils rendent le code plus modulaire, flexible, testable et compréhensible.

::: info
Les principes SOLID ne sont pas réservés aux « experts » : ils s’appliquent à tous les niveaux, même dans de petits projets. Les comprendre, c’est progresser vers une programmation professionnelle.
:::

---

## S — Single Responsibility Principle (Responsabilité unique)

**Définition :**
Chaque classe ou module doit avoir une seule responsabilité, c’est-à-dire une seule raison de changer.

**Explication :**
Une classe qui fait trop de choses devient difficile à maintenir. Si une modification concerne plusieurs aspects, on risque d’introduire des bugs ailleurs.

::: tip Exemple pédagogique
- Une classe `Facture` qui gère à la fois le calcul du montant et l’impression du PDF viole ce principe. Il vaut mieux séparer ces responsabilités.
:::

---

## O — Open/Closed Principle (Ouvert/Fermé)

**Définition :**
Les entités logicielles (classes, modules, fonctions) doivent être **ouvertes à l’extension** mais **fermées à la modification**.

**Explication :**
On doit pouvoir ajouter de nouveaux comportements sans modifier le code existant, par exemple en utilisant l’héritage ou les interfaces.

::: info
Privilégiez l’ajout de nouvelles classes ou méthodes plutôt que la modification de celles déjà en place.
:::

---

## L — Liskov Substitution Principle (Substitution de Liskov)

**Définition :**
Une classe dérivée doit pouvoir être utilisée à la place de sa classe parente sans altérer la justesse du programme.

**Explication :**
Si une sous-classe ne respecte pas le contrat de la classe parente, le code risque de mal fonctionner ou de produire des erreurs inattendues.

**Exemple :**
```java
class Oiseau {
    public void voler() { /* ... */ }
}
class Canard extends Oiseau { }
class Autruche extends Oiseau {
    @Override
    public void voler() {
        throw new UnsupportedOperationException(); // Problème : une autruche ne vole pas !
    }
}
```
::: warning À éviter
Ici, `Autruche` ne respecte pas le contrat de `Oiseau` : toutes les méthodes de la classe parente ne sont pas valides pour la sous-classe.
:::

---

## I — Interface Segregation Principle (Séparation des interfaces)

**Définition :**
Il vaut mieux plusieurs petites interfaces spécifiques qu’une grosse interface générale.

**Explication :**
Une classe ne devrait jamais être obligée d’implémenter des méthodes dont elle n’a pas besoin. Cela rend le code plus clair et plus facile à maintenir.

::: info
Découpez vos interfaces pour qu’elles soient cohérentes et ciblées.
:::

---

## D — Dependency Inversion Principle (Inversion des dépendances)

**Définition :**
Dépendre des abstractions (interfaces), pas des implémentations concrètes.

**Explication :**
Au lieu de créer directement les objets dont une classe a besoin, on les lui fournit (injection de dépendance). Cela rend le code plus flexible et testable.

::: tip Pour aller plus loin
Voir le chapitre sur les interfaces pour un exemple détaillé d’inversion de dépendance.
:::

---

## Pourquoi appliquer SOLID ?

- Facilite la maintenance et l’évolution du code
- Favorise la réutilisabilité et les tests unitaires
- Réduit les effets de bord lors des modifications
- Rend le code plus compréhensible pour les autres développeurs

::: tip Résumé pédagogique
Appliquer SOLID, c’est écrire du code plus propre, plus modulaire et plus durable. Essayez d’identifier ces principes dans vos projets et de les mettre en pratique progressivement.
:::

---

## Pour s’entraîner

- Repérez dans vos projets ou exercices des exemples où un principe SOLID n’est pas respecté. Comment pourriez-vous améliorer la conception ?
- Essayez de reformuler une classe « dieu » (qui fait tout) en plusieurs classes à responsabilité unique.
- Proposez une interface trop générale, puis segmentez-la en interfaces plus spécifiques.

---

*Les principes SOLID sont des repères pour progresser en conception objet. Plus vous les appliquez, plus votre code gagne en qualité et en robustesse !*
