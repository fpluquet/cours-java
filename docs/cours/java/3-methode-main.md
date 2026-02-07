# La méthode `main`

Au cœur de chaque programme Java, il y a un point de départ, un rituel immuable : la méthode `main`. C’est elle qui donne vie à votre application, qui orchestre le tout premier souffle de votre code.

Comme nous l’avons déjà évoqué, Java est un langage farouchement orienté objet. Rien n’existe en dehors d’une classe, et la méthode `main` ne fait pas exception à la règle. Elle est le portail d’entrée, le chef d’orchestre qui lance l’exécution.

Sa signature est sacrée :
```java
public static void main(String[] args)
```
- `public` : pour être accessible par la machine virtuelle Java.
- `static` : car elle doit pouvoir être appelée sans qu’aucun objet ne soit encore créé.
- `void` : elle ne renvoie rien, elle agit.
- `String[] args` : un tableau de chaînes de caractères, pour recevoir d’éventuels arguments passés lors du lancement du programme.

À noter : contrairement à d’autres langages comme C#, le nom du fichier exécuté ne fait pas partie de ces arguments. Seuls les paramètres explicitement fournis à l’exécution y figurent.

## Exemple : exploiter les arguments de la ligne de commande

La méthode `main` peut recevoir des paramètres lors du lancement du programme. Ceux-ci sont accessibles via le tableau `args`. Voici un exemple simple qui affiche chaque argument reçu :

```java
public class ArgumentsDemo {
    public static void main(String[] args) {
        System.out.println("Nombre d'arguments : " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("Argument " + i + " : " + args[i]);
        }
    }
}
```

Si vous lancez ce programme avec la commande :
```
java ArgumentsDemo bonjour 42 test
```
Vous obtiendrez :
```
Nombre d'arguments : 3
Argument 0 : bonjour
Argument 1 : 42
Argument 2 : test
```

Ainsi, la méthode `main` est la porte d’entrée universelle de vos aventures Java. C’est ici que tout commence !
## Nouveauté Java 25 : simplification de la méthode `main`

::: tip Java 25
Depuis Java 25, la signature de la méthode `main` a été considérablement simplifiée. Cette évolution vise à rendre le langage plus accessible aux débutants, en supprimant les éléments « cérémoniels » inutiles pour les petits programmes.
:::

### Instance `main` methods

Les mots-clés `public`, `static` et le paramètre `String[] args` ne sont plus obligatoires. Java 25 permet d'écrire une méthode `main` d'instance, sans paramètre :

```java
// Avant Java 25 (toujours valide)
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Depuis Java 25 : signature simplifiée
class HelloWorld {
    void main() {
        System.out.println("Hello, World!");
    }
}
```

Le lanceur Java choisit la méthode `main` selon cette priorité :
1. S'il existe une méthode `main(String[] args)` (statique ou non), elle est choisie.
2. Sinon, s'il existe une méthode `main()` sans paramètre, elle est choisie.
3. Si la méthode choisie n'est pas `static`, Java instancie la classe (qui doit avoir un constructeur sans argument) puis appelle `main()` sur l'objet créé.

::: info
La version classique `public static void main(String[] args)` reste parfaitement valide. La nouvelle syntaxe est simplement une alternative plus concise, idéale pour les petits programmes et l'apprentissage.
:::

### Compact Source Files (fichiers sources compacts)

Java 25 va encore plus loin : il est possible d'écrire un programme sans même déclarer de classe ! On écrit directement les méthodes et champs dans le fichier source. Le compilateur crée automatiquement une classe implicite.

```java
// Fichier HelloWorld.java — pas de déclaration de classe !
void main() {
    System.out.println("Hello, World!");
}
```

On peut même y déclarer des méthodes auxiliaires et des champs :

```java
// Fichier Greeting.java
String greeting() { return "Hello, World!"; }

void main() {
    System.out.println(greeting());
}
```

::: warning Attention
Un fichier source compact doit obligatoirement contenir une méthode `main` exécutable. La classe implicite créée par le compilateur n'a pas de nom utilisable dans le code source (on ne peut pas l'instancier avec `new`).
:::

::: info Imports automatiques
Dans un fichier source compact, toutes les classes publiques du module `java.base` sont automatiquement importées (comme si `import module java.base;` était présent en haut du fichier). Cela inclut `java.util.List`, `java.io.File`, `java.util.stream.Stream`, etc.
:::

Cette approche progressive (compact → classe explicite → projet structuré) permet aux débutants de se concentrer sur la logique avant de découvrir les concepts d'encapsulation et de modularité.