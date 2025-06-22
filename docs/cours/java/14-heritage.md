# Héritage

L’héritage est l’un des concepts fondamentaux de la programmation orientée objet (POO), au même titre que l’encapsulation et le polymorphisme. Il permet de créer de nouvelles classes à partir de classes existantes, en réutilisant et en spécialisant leur comportement. Grâce à l’héritage, on peut factoriser le code commun à plusieurs classes et organiser les concepts de manière hiérarchique, ce qui favorise la lisibilité, la maintenance et l’évolution des programmes.

::: info Définition
L’héritage consiste à définir une nouvelle classe (dite « classe dérivée » ou « classe enfant ») à partir d’une classe existante (dite « classe de base » ou « classe parente »). La classe enfant hérite des attributs et des méthodes de la classe parente, et peut en ajouter ou en modifier.
:::

## Pourquoi utiliser l’héritage ?

- **Réutilisation du code** : Éviter de réécrire plusieurs fois le même code dans différentes classes.
- **Organisation logique** : Structurer les concepts selon des relations « est-un » (ex : un Chien est un Animal).
- **Extensibilité** : Ajouter facilement de nouveaux comportements spécifiques sans toucher au code existant.

::: tip Exemple d’analogie
Dans la vie courante, on peut dire qu’un vélo, une voiture et un camion sont tous des véhicules. Ils partagent des caractéristiques communes (roues, moteur, capacité à se déplacer), mais chacun a aussi ses particularités. En POO, on modélisera cela par une classe `Vehicule` dont hériteront les classes `Velo`, `Voiture`, `Camion`.
:::

---

## Mot-clef `extends`

Pour hériter d’une classe en Java, on utilise le mot-clé `extends`. Cela signifie littéralement « étendre » la classe de base, c’est-à-dire en reprendre les caractéristiques tout en les complétant ou en les spécialisant.

```java
class Personne {
    protected String nom; // Accessible dans les sous-classes
    protected String prenom; // Accessible dans les sous-classes
    private int age; // Non accessible dans les sous-classes
    public Personne(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }
}
class Adulte extends Personne {
    private String nomEntreprise;
    public Adulte(String nom, String prenom, String nomEntreprise) {
        super(nom, prenom); // Appel du constructeur parent
        this.nomEntreprise = nomEntreprise;
    }
}
class Enfant extends Personne {
    private String nomEcole;
    public Enfant(String nom, String prenom, String nomEcole) {
        super(nom, prenom);
        this.nomEcole = nomEcole;
    }
}
```

Dans cet exemple, les classes `Adulte` et `Enfant` héritent de la classe `Personne`. Elles récupèrent automatiquement les attributs `nom` et `prenom`, ainsi que les méthodes publiques de `Personne`. Elles peuvent aussi ajouter leurs propres attributs ou redéfinir des méthodes si besoin.

::: info
Le mot-clé `super` permet d’appeler le constructeur ou les méthodes de la classe parente. C’est utile pour initialiser les attributs hérités ou réutiliser du code parent.
:::

---

## Polymorphisme de méthodes

Le polymorphisme est la capacité d’un même nom de méthode à se comporter différemment selon l’objet qui la porte. Grâce à l’héritage, on peut utiliser un objet enfant comme s’il était de type parent. Cela autorise l’utilisation de méthodes de la classe parente, mais ces méthodes peuvent être redéfinies (on parle alors de « surcharge » ou plutôt de « redéfinition », en anglais *override*) dans la classe enfant.

```java
class Point {
    protected double x;
    protected double y;
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
}
class Forme {
    protected Point centre;
    public Forme(Point centre) {
        this.centre = centre;
    }
    public String getNom() {
        return "Forme";
    }
    public String getHelloStr() {
        return "Je suis : " + this.getNom();
    }
}
class Cercle extends Forme {
    protected double rayon;
    public Cercle(Point centre, double rayon) {
        super(centre);
        this.rayon = rayon;
    }
    @Override
    public String getNom() {
        return "un cercle";
    }
}
class Rectangle extends Forme {
    protected double largeur;
    protected double longueur;
    public Rectangle(Point centre, double largeur, double longueur) {
        super(centre);
        this.largeur = largeur;
        this.longueur = longueur;
    }
    @Override
    public String getNom() {
        return "un rectangle";
    }
}
public class Program {
    public static void main(String[] args) {
        Forme c = new Cercle(new Point(0, 0), 10);
        Forme r = new Rectangle(new Point(5, 8), 10, 20);
        System.out.println(c.getHelloStr()); // affiche "Je suis : un cercle"
        System.out.println(r.getHelloStr()); // affiche "Je suis : un rectangle"
    }
}
```

Dans ce code, la méthode `getNom()` est redéfinie dans chaque sous-classe. Lorsqu’on appelle `getHelloStr()` sur une variable de type `Forme`, c’est la version la plus spécialisée de `getNom()` qui est utilisée, selon le type réel de l’objet (ici, `Cercle` ou `Rectangle`).

::: tip À savoir
Le mot-clé `@Override` indique que la méthode redéfinit une méthode de la classe parente. Cela permet d’éviter les erreurs de signature et améliore la lisibilité du code.
:::

---

## Classes abstraites

Une classe abstraite est une classe que l’on ne peut pas instancier directement. Elle sert de modèle pour d’autres classes, qui devront en hériter et compléter les méthodes abstraites. C’est un outil puissant pour imposer une structure commune à plusieurs classes, tout en laissant la liberté de spécialiser certains comportements.

- Une classe abstraite peut contenir des attributs, des méthodes concrètes (avec code) et des méthodes abstraites (sans code, juste la signature).
- On est donc obligé de créer une sous-classe qui en dérive et qui implémente les méthodes abstraites :

::: tip À noter
Même si une classe abstraite ne peut pas être instanciée directement, elle peut parfaitement définir un ou plusieurs constructeurs. Ceux-ci servent à initialiser les attributs hérités par les sous-classes. Lorsqu’une sous-classe hérite d’une classe abstraite, elle peut (et doit souvent) appeler le constructeur de la classe abstraite via `super(...)` dans son propre constructeur. Cela permet de garantir que l’état de l’objet est correctement initialisé, même si l’on ne crée jamais d’instance directe de la classe abstraite.
:::

```java
abstract class Forme {
    protected Point centre;
    public Forme(Point c) {
        this.centre = c;
    }
    public abstract double getAire(); // Méthode abstraite
}
class Cercle extends Forme {
    protected double rayon;
    public Cercle(Point c, double rayon) {
        super(c); // Appel du constructeur de la classe abstraite
        this.rayon = rayon;
    }
    @Override
    public double getAire() {
        return Math.PI * rayon * rayon;
    }
}
// Dans le main :
Cercle c = new Cercle(new Point(5, 6), 5.2); // OK
Forme fc = new Cercle(new Point(5, 7), 3.0); // OK
// Forme f = new Forme(new Point(0,0)); // Erreur : on ne peut pas instancier une classe abstraite
```

::: info
Utilisez les classes abstraites pour définir des comportements communs à plusieurs classes, tout en forçant la spécialisation de certaines méthodes dans les sous-classes. Cela permet de garantir que toutes les sous-classes respecteront un contrat minimal.
:::

---

## Le mot-clé `super` et la résolution statique

Le mot-clé `super` permet d'accéder explicitement aux membres (méthodes ou attributs) de la classe parente, même si ceux-ci sont redéfinis dans la classe fille. La résolution de `super` est **statique** : elle dépend du type de la classe dans laquelle le code est écrit, et non de l'objet réel manipulé à l'exécution.

À l'inverse, le mot-clé `this` fait référence à l'objet courant : la résolution des méthodes appelées via `this` est **dynamique** (liée à l'objet réel, donc au polymorphisme).

### Exemple comparatif
```java
class A {
    public String quiSuisJe() { return "A"; }
    public String test() { return this.quiSuisJe(); }
}
class B extends A {
    @Override
    public String quiSuisJe() { return "B"; }
    public String testSuperB() { return super.quiSuisJe(); }
}
public class Demo {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.quiSuisJe());      // B (dynamique)
        System.out.println(a.test());           // B (dynamique)
        B b = new B();
        System.out.println(b.quiSuisJe());      // B (dynamique)
        System.out.println(b.test());           // B (dynamique)
        System.out.println(b.testSuperB());     // A (statique)
    }
}
```

::: tip Astuce
Utilisez `super` pour accéder à une méthode ou un constructeur parent, mais gardez en tête que le polymorphisme ne s'applique pas à `super`.
:::

---

## Détail de l'exemple sur `super` et `this`

Dans l'exemple ci-dessus, on illustre la différence entre la résolution dynamique (liée à `this`) et la résolution statique (liée à `super`).

Reprenons le code :
```java
class A {
    public String quiSuisJe() { return "A"; }
    public String test() { return this.quiSuisJe(); }
}
class B extends A {
    @Override
    public String quiSuisJe() { return "B"; }
    public String testSuperB() { return super.quiSuisJe(); }
}
public class Demo {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.quiSuisJe());      // B (dynamique)
        System.out.println(a.test());           // B (dynamique)
        B b = new B();
        System.out.println(b.quiSuisJe());      // B (dynamique)
        System.out.println(b.test());           // B (dynamique)
        System.out.println(b.testSuperB());     // A (statique)
    }
}
```

### Explications ligne par ligne
- `A a = new B();` : la variable `a` est de type `A`, mais l'objet réel est de type `B` (polymorphisme).
- `a.quiSuisJe()` : appelle la méthode de l'objet réel, donc `B.quiSuisJe()` → affiche "B".
- `a.test()` : appelle `A.test()`, qui fait `this.quiSuisJe()`. Ici, `this` désigne l'objet réel (de type `B`), donc c'est encore `B.quiSuisJe()` qui est appelée → affiche "B".
- `B b = new B();` : la variable et l'objet sont tous deux de type `B`.
- `b.quiSuisJe()` et `b.test()` : même raisonnement, on obtient "B".
- `b.testSuperB()` : appelle la méthode `testSuperB()` de `B`, qui fait `super.quiSuisJe()`. Ici, `super` désigne la version de la méthode dans la classe parente (`A`), donc c'est `A.quiSuisJe()` qui est appelée → affiche "A".

### À retenir
- `this` permet d'accéder à la version la plus spécialisée de la méthode (résolution dynamique, selon l'objet réel).
- `super` permet d'accéder à la version de la méthode définie dans la classe parente (résolution statique, selon le code écrit).
- Le polymorphisme ne s'applique pas à `super` : on force l'appel à la version parent, même si une version plus spécialisée existe.

Cet exemple est fondamental pour bien comprendre le comportement de l'héritage et du polymorphisme en Java.

---

## Encadré : SOLID et héritage

L’héritage est directement concerné par le principe de substitution de Liskov (**L** de SOLID) : toute classe dérivée doit pouvoir être utilisée à la place de sa classe parente sans altérer le bon fonctionnement du programme.

::: tip À retenir
Respecter ce principe garantit la robustesse et la cohérence de vos hiérarchies de classes.
:::

Pour une explication complète des principes SOLID, voir le chapitre dédié.

---

## Pour aller plus loin

- **Composition vs héritage** : L’héritage n’est pas la seule façon de réutiliser du code. Parfois, il est préférable d’utiliser la composition (une classe possède une autre classe) plutôt que l’héritage (une classe est une autre classe). On parle alors du principe « favor composition over inheritance ».
- **Limites de l’héritage** : Un mauvais usage de l’héritage peut conduire à des hiérarchies trop rigides ou à des problèmes de maintenance. Il est important de bien réfléchir à la structure de ses classes.
- **Interfaces** : En Java, une classe peut hériter d’une seule classe (héritage simple), mais peut implémenter plusieurs interfaces. Les interfaces permettent de définir des contrats que les classes doivent respecter, sans imposer d’implémentation.

N’hésitez pas à expérimenter avec vos propres hiérarchies de classes pour bien comprendre la puissance et les subtilités de l’héritage en Java !
