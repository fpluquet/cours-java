# Conception orientée objet

La programmation orientée objet, telle une architecture savante, repose sur des principes qui en garantissent la solidité, la souplesse et la beauté. Ces principes, forgés par l’expérience et la réflexion, sont les fondations sur lesquelles s’élèvent les logiciels robustes et évolutifs. Parmi eux, les fameux SOLID, mais aussi la Loi de Demeter, tracent la voie d’un code élégant et pérenne. Plongeons dans ces piliers, en les éclairant d’exemples concrets et de réflexions issues du terrain.

## SOLID
Les cinq principes SOLID sont des boussoles pour l’ingénieur logiciel. Ils guident la conception vers la clarté, la modularité et la facilité d’évolution.

### S — Single Responsibility Principle (Responsabilité unique)

Imaginez une classe comme un artisan spécialisé : elle doit n’avoir qu’une seule mission, une seule raison de changer. Plus une classe s’éparpille, plus elle devient fragile et difficile à maintenir.

**Exemple :**

```java
// Mauvais exemple : une classe gère trop de choses
class Rapport {
    void generer() {}
    void sauvegarder() {}
}

// Bon exemple : séparation des responsabilités
class Rapport {
    void generer() {}
}
class RapportSauvegarde {
    void sauvegarder(Rapport r) {}
}
```

---

### O — Open/Closed Principle (Ouvert/Fermé)

Un bon logiciel doit pouvoir évoluer sans être sans cesse remanié. Les entités doivent être ouvertes à l’extension, mais fermées à la modification. On ajoute, on enrichit, sans tout casser.

**Exemple :**

```java
// Mauvais exemple : modification de la classe pour chaque nouveau type
class Facture {
    double calculerRemise(String type) {
        if (type.equals("VIP")) return 0.2;
        else return 0.0;
    }
}

// Bon exemple : extension par héritage
interface Remise {
    double calculer();
}
class RemiseVIP implements Remise {
    public double calculer() { return 0.2; }
}
```

---

### L — Liskov Substitution Principle

L’héritage doit respecter le contrat de la classe mère. Une sous-classe doit pouvoir se substituer à sa classe parente sans altérer le comportement attendu. Sinon, gare aux bugs subtils !

**Exemple :**

```java
// Mauvais exemple : une sous-classe casse le contrat
class Rectangle {
    int largeur, hauteur;
    void setLargeur(int l) { largeur = l; }
    void setHauteur(int h) { hauteur = h; }
}
class Carre extends Rectangle {
    void setLargeur(int l) { largeur = hauteur = l; }
    void setHauteur(int h) { largeur = hauteur = h; }
}

// Bon exemple : ne pas forcer l’héritage
class Rectangle { /* ... */ }
class Carre { /* ... */ }
```

---

### I — Interface Segregation Principle

Il vaut mieux plusieurs interfaces précises qu’une seule interface fourre-tout. Ainsi, chaque classe n’implémente que ce dont elle a réellement besoin, et le code reste clair et flexible.

**Exemple :**

```java
// Mauvais exemple : interface trop large
interface Machine {
    void imprimer();
    void scanner();
    void faxer();
}

// Bon exemple : interfaces spécifiques
interface Imprimante { void imprimer(); }
interface Scanner { void scanner(); }
```

---

### D — Dependency Inversion Principle

Pour un code souple et testable, il faut dépendre d’abstractions plutôt que de classes concrètes. On injecte les dépendances, on ne les crée pas en dur.

**Exemple :**

```java
// Mauvais exemple : dépendance directe
class Service {
    private Database db = new Database();
}

// Bon exemple : injection de dépendance
class Service {
    private IDatabase db;
    public Service(IDatabase db) { this.db = db; }
}
```

---

## Law of Demeter (LoD)

La Loi de Demeter, ou « principe du moindre couplage », recommande de ne parler qu’à ses proches collaborateurs. Plus on limite les chaînes d’appels, plus le code est robuste et facile à faire évoluer.

**Exemple :**

```java
// Mauvais exemple : chaîne d’appels
client.getCommande().getFacture().payer();

// Bon exemple : délégation
client.payerFacture();
```

En respectant ces principes, on bâtit des architectures solides, prêtes à affronter les évolutions et les défis du temps.
