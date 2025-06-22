# Réutilisabilité et maintenabilité

Dans l’odyssée du développement logiciel, deux qualités font la différence entre un projet éphémère et une œuvre qui traverse le temps : la réutilisabilité et la maintenabilité. Un code réutilisable est un trésor, car il évite de réinventer la roue. Un code maintenable, lui, est une promesse de sérénité pour l’équipe qui devra le faire évoluer, corriger ou adapter. Ces principes, souvent cités, prennent tout leur sens à travers des pratiques concrètes et des exemples vécus.

## DRY (Don’t Repeat Yourself)

La duplication est l’ennemie du progrès. Chaque répétition de code est une source potentielle d’erreur, un piège pour celui qui devra un jour tout modifier. Le principe DRY nous invite à centraliser la logique, à n’avoir qu’une seule source de vérité pour chaque information ou comportement.

**Exemple :**

```java
// Mauvais exemple : duplication
public double surfaceCercle(double rayon) {
    return 3.14159 * rayon * rayon;
}
public double perimetreCercle(double rayon) {
    return 2 * 3.14159 * rayon;
}

// Bon exemple : extraire la constante
public static final double PI = 3.14159;
public double surfaceCercle(double rayon) {
    return PI * rayon * rayon;
}
public double perimetreCercle(double rayon) {
    return 2 * PI * rayon;
}
```

Un changement de formule ou de constante ne doit se faire qu’à un seul endroit, sous peine de voir le code diverger et les bugs proliférer.


## Single Source of Truth (SSOT)

Dans un système bien conçu, chaque information n’existe qu’à un seul endroit. Multiplier les copies, c’est s’exposer à l’incohérence et à la confusion. Le principe SSOT est le garant de la cohérence des données.

**Exemple :**

Imaginons une application qui communique avec une API distante. Si l’URL de cette API est dupliquée dans plusieurs classes, une modification future (changement de domaine, de version, etc.) risque d’être oubliée à un endroit, provoquant des bugs difficiles à diagnostiquer.

```java
// Mauvais exemple : l’URL de l’API est dupliquée
class UserService {
    private static final String API_URL = "https://api.exemple.com/v1/";
    // ...
}
class ProductService {
    private static final String API_URL = "https://api.exemple.com/v1/";
    // ...
}

// Bon exemple : une seule source de vérité
class Config {
    public static final String API_URL = "https://api.exemple.com/v1/";
}
class UserService {
    // Utilise Config.API_URL
}
class ProductService {
    // Utilise Config.API_URL
}
```

En centralisant l’information, on garantit la cohérence et on simplifie la maintenance.


## Separation of Concerns (Séparation des préoccupations)

Un bon logiciel est comme un orchestre : chaque instrument a son rôle, chaque musicien sa partition. En séparant les responsabilités, on obtient un code plus lisible, plus testable, plus évolutif.

**Exemple :**

```java
// Mauvais exemple : une classe fait tout
class Application {
    void afficherUI() {}
    void sauvegarderDonnees() {}
    void envoyerEmail() {}
}

// Bon exemple : séparation des responsabilités
class UIManager { void afficherUI() {} }
class DataManager { void sauvegarderDonnees() {} }
class EmailService { void envoyerEmail() {} }
```

Chaque classe, chaque module, doit avoir une mission claire et limitée.


## Encapsulation

L’encapsulation, c’est l’art de protéger les secrets de fabrication. En cachant les détails internes d’une classe, on limite les risques d’erreur et on rend le code plus robuste face aux changements.

**Exemple :**

```java
// Mauvais exemple : attributs publics
class Compte {
    public double solde;
}

// Bon exemple : attribut privé et méthodes d’accès
class Compte {
    private double solde;
    public double getSolde() { return solde; }
    public void deposer(double montant) { solde += montant; }
}
```

L’utilisateur de la classe n’a accès qu’à ce qui est nécessaire, et rien de plus.


## Information Hiding (Masquage d’information)

Proche de l’encapsulation, le masquage d’information vise à limiter l’exposition des détails d’implémentation. Moins on en montre, moins on risque de devoir tout changer si l’intérieur évolue.

**Exemple :**

```java
// Mauvais exemple : exposer la structure interne
class Stack {
    public Object[] elements;
}

// Bon exemple : masquer la structure
class Stack {
    private Object[] elements;
    public void push(Object o) { /* ... */ }
    public Object pop() { /* ... */ }
}
```


## Composition Over Inheritance (Préférer la composition à l’héritage)

L’héritage est parfois tentant, mais il peut rendre le code rigide et difficile à faire évoluer. La composition, elle, offre souplesse et modularité. En assemblant des objets, on construit des systèmes plus adaptables.

**Exemple :**

Imaginons que l’on souhaite modéliser des périphériques bureautiques : certaines imprimantes peuvent aussi scanner ou faxer, d’autres non. Si l’on utilise l’héritage, on se retrouve vite avec une hiérarchie complexe et peu flexible. La composition permet d’assembler dynamiquement les fonctionnalités nécessaires.

```java
// Mauvais exemple : héritage rigide
class Imprimante {
    void imprimer() {}
}
class ImprimanteMultifonction extends Imprimante {
    void scanner() {}
    void faxer() {}
}

// Bon exemple : composition flexible
interface Scanner {
    void scanner();
}
interface Fax {
    void faxer();
}
class Imprimante {
    void imprimer() {}
}
class ImprimanteMultifonction {
    private Imprimante imprimante;
    private Scanner scanner;
    private Fax fax;
    ImprimanteMultifonction(Imprimante imprimante, Scanner scanner, Fax fax) {
        this.imprimante = imprimante;
        this.scanner = scanner;
        this.fax = fax;
    }
    void imprimer() { imprimante.imprimer(); }
    void scanner() { scanner.scanner(); }
    void faxer() { fax.faxer(); }
}
```

Avec la composition, on peut créer des objets multifonctions ou spécialisés sans multiplier les sous-classes, et faire évoluer les fonctionnalités indépendamment les unes des autres.
