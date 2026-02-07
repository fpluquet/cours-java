# Les méthodes en Java

Les méthodes sont le cœur battant de vos programmes Java. Elles permettent de structurer le code, de le rendre réutilisable, lisible et modulaire. Comprendre comment les définir, les utiliser, les surcharger ou les redéfinir est essentiel pour progresser.

## Définition d'une méthode

Définir une méthode, c’est comme écrire une petite machine à laquelle on donne un nom, des paramètres, et qui effectue une tâche précise. On précise sa visibilité (public, private…), son type de retour, son nom, et ses éventuels arguments entre parenthèses.

Exemple :
```java
public int calcul(int a, int b) {
    return a + b;
}
```
Ici, la méthode `calcul` additionne deux entiers et retourne le résultat. En Java, par convention, le nom des méthodes et des paramètres commence toujours par une minuscule.



## Redéfinition de méthodes (Override)

En Java, il est possible de redéfinir le comportement d’une méthode héritée d’une classe parente. C’est ce qu’on appelle l’**override**. Cela permet d’adapter ou d’enrichir le fonctionnement d’une méthode dans une classe fille.

Prenons un exemple avec la méthode `toString()` :
```java
public class Main {
    public static void main(String[] args) {
        Personne p = new Personne("Dubreuil", "Bernard");
        System.out.println(p);
    }
}
public class Personne {
    private String nom;
    private String prenom;
    // Constructeur
    public Personne(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }
    public String getNom() {
        return this.nom;
    }
    public String getPrenom() {
        return this.prenom;
    }
    // On indique que l'on surcharge (bonne pratique mais pas obligatoire)
    @Override
    public String toString() {
        return String.format("Personne : %s %s", this.nom, this.prenom);
    }
}
```
On remarque que toutes les classes Java héritent de la classe `Object`, et donc possèdent déjà une méthode `toString()`. La redéfinir permet d’obtenir un affichage personnalisé.

## Surcharge de méthodes (Overload)

La **surcharge** consiste à créer plusieurs méthodes du même nom, mais avec des signatures différentes (types ou nombre de paramètres). Cela permet d’adapter le comportement d’une méthode selon les besoins.

Exemple :
```java
public int calcul(int a, String b) {
    return a + Integer.parseInt(b);
}
// Surcharge de calcul()
public int calcul(int a, int b) {
    return a + b * 10;
}
```
Lorsqu’on appelle `calcul`, le compilateur choisit la version qui correspond à la signature de l’appel.

Exemple d’utilisation :
```java
public class Main {
    public static void main(String[] args) {
        Personne p = new Personne("Dubreuil", "Bernard");
        System.out.println(p.calcul(10, 20)); // Affiche 210
        System.out.println(p.calcul(10, "20")); // Affiche 30
    }
}
```

Grâce à la définition, la surcharge et la redéfinition de méthodes, vous pouvez écrire des programmes flexibles, évolutifs et adaptés à tous les besoins.

## Arguments par défaut : une astuce à connaître

Contrairement à certains langages, Java ne permet pas de définir des arguments par défaut directement dans la signature d’une méthode :
```java
public int calcul(int a, int b = 20) {   // KO !! IMPOSSIBLE
    return a + b;
}
```
Mais il existe une astuce : la **surcharge**. On crée une seconde méthode du même nom, avec moins de paramètres, qui appelle la première avec une valeur par défaut :
```java
public int calcul(int a, int b) {
    return a + b;
}
public int calcul(int a) {
    return calcul(a, 20);
}
```
Ainsi, on obtient le même effet qu’un argument par défaut, tout en respectant la syntaxe Java.