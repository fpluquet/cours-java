# Héritage

L’héritage est un des piliers de la programmation orientée objet. Il permet de créer de nouvelles classes à partir de classes existantes, en réutilisant et en spécialisant leur comportement. Cela favorise la factorisation du code et la création de hiérarchies logiques.

> **À retenir** : Grâce à l’héritage, une classe « enfant » hérite des attributs et méthodes de sa classe « parent », et peut en ajouter ou en modifier.

## Mot-clef `extends`

Pour hériter d’une classe en Java, on utilise le mot-clé `extends`.

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

> **Info** : Le mot-clé `super` permet d’appeler le constructeur ou les méthodes de la classe parente.

## Polymorphisme de méthodes

Le polymorphisme permet d’utiliser un objet enfant comme s’il était de type parent. Cela autorise l’utilisation de méthodes de la classe parente, mais ces méthodes peuvent être redéfinies (surchargées) dans la classe enfant.

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

> **À savoir** : Le mot-clé `@Override` indique que la méthode redéfinit une méthode de la classe parente. Cela permet d’éviter les erreurs de signature.

## Classes abstraites

Une classe abstraite est une classe que l’on ne peut pas instancier directement. Elle sert de modèle pour d’autres classes, qui devront en hériter et compléter les méthodes abstraites.

- Une classe abstraite peut contenir des attributs, des méthodes concrètes (avec code) et des méthodes abstraites (sans code).
- On est donc obligé de créer une sous-classe qui en dérive :

```java
abstract class Forme {
    protected Point centre;
    public Forme(Point c) {
        this.centre = c;
    }
}
class Cercle extends Forme {
    protected double rayon;
    public Cercle(Point c, double rayon) {
        super(c);
        this.rayon = rayon;
    }
}
// Dans le main :
Cercle c = new Cercle(new Point(5, 6), 5.2); // OK
Forme fc = new Cercle(new Point(5, 7), 3.0); // OK
// Forme f = new Forme(new Point(0,0)); // Erreur : on ne peut pas instancier une classe abstraite
```

> **Info** : Utilisez les classes abstraites pour définir des comportements communs à plusieurs classes, tout en forçant la spécialisation de certaines méthodes dans les sous-classes.

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


> **Astuce :**
> Utilisez `super` pour accéder à une méthode ou un constructeur parent, mais gardez en tête que le polymorphisme ne s'applique pas à `super`.

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

L’héritage et le polymorphisme sont essentiels pour structurer des programmes évolutifs et réutilisables. N’hésitez pas à expérimenter avec vos propres hiérarchies de classes pour bien comprendre leur puissance et leurs subtilités !

---

## Encadré : SOLID et héritage

L’héritage est directement concerné par le principe de substitution de Liskov (**L** de SOLID) : toute classe dérivée doit pouvoir être utilisée à la place de sa classe parente sans altérer le bon fonctionnement du programme.

> **À retenir :** Respecter ce principe garantit la robustesse et la cohérence de vos hiérarchies de classes.

Pour une explication complète des principes SOLID, voir le chapitre dédié.
