# Classes

En Java, tout commence par les classes. Imaginez-les comme les plans d’un bâtiment : sans plan, impossible de construire quoi que ce soit ! Ainsi, en Java, rien n’existe en dehors d’une classe. C’est pourquoi il est essentiel de bien comprendre ce concept fondamental.

::: tip À retenir
Une classe, c’est le moule à partir duquel on fabrique des objets. Elle définit les caractéristiques (attributs) et les comportements (méthodes) communs à tous les objets de ce type.
:::

## Définition d'une classe et ses attributs

Pour définir une classe, il faut préciser sa visibilité (c’est-à-dire qui pourra y accéder), utiliser le mot-clé `class`, puis donner un nom à la classe. Voici un exemple simple :

```java
public class Personne{
 // ...
}
```

Remarquez que le nom de la classe commence toujours par une majuscule, c’est une convention très importante en Java. Cela permet de distinguer facilement les classes des variables ou des méthodes.

### Les niveaux de visibilité

En Java, il existe plusieurs niveaux de visibilité qui déterminent qui peut accéder à quoi :

![visibilites](/images/Java_visibility.png)

- `public` : n’importe quel code peut accéder à la classe.
- `package` (par défaut, si on ne précise rien) : seuls les codes du même package peuvent y accéder.
- `private` : impossible d’y accéder depuis l’extérieur de la classe (et du package).
- `protected` : accessible depuis les classes du même package, et depuis les sous-classes (même si elles sont dans un autre package).

::: info
En début d’apprentissage, on utilise souvent `public` pour les classes principales, mais il est important de bien choisir la visibilité pour protéger ses données.
:::

Chaque classe hérite automatiquement de la classe `Object`, ce qui lui donne déjà certaines fonctionnalités de base (comme la méthode `toString()`, par exemple).

## Constructeurs de classe

Lorsqu’on crée un objet à partir d’une classe, on utilise un constructeur. C’est une méthode spéciale qui permet d’initialiser les valeurs de l’objet ou d’effectuer des actions au moment de sa création.

Voici comment on définit un constructeur :

```java
class Personne{
    private String nom;
    private String prenom;
    // Constructeur
    public Personne(String nom, String prenom)
    {
        this.nom = nom;
        this.prenom = prenom;
    }
}
```

Le constructeur porte toujours le même nom que la classe et ne retourne jamais de valeur.

::: info
Si vous ne définissez pas de constructeur, Java en crée un par défaut (sans argument).
:::

## Délégation de constructeurs

Parfois, on souhaite proposer plusieurs façons de créer un objet, avec plus ou moins d’informations. Pour éviter de répéter du code, on peut faire appel à la délégation de constructeurs : un constructeur peut en appeler un autre de la même classe, en passant des valeurs par défaut.

**Attention : l’appel à un autre constructeur (`this(...)`) doit toujours être la première instruction du constructeur.**

Exemple :

```java
public class Personne{
    private String nom;
    private String prenom;
    // Constructeur par défaut sans argument
    public Personne(){
        // Délégation de constructeur
        this("Dudziak");
    }
    // Constructeur avec argument
    public Personne(String nom){
        // Délégation vers le constructeur avec deux arguments
        this(nom, "Thomas");
    }
    // Constructeur avec plusieurs arguments
    public Personne(String nom, String prenom){
        this.nom = nom;
        this.prenom = prenom;
    }
}
```

::: tip Pourquoi déléguer ?
Cela permet d’éviter la duplication de code et de centraliser la logique d’initialisation.
:::

## Redéfinition (surcharge) de constructeur

Il est possible de définir plusieurs constructeurs dans une même classe, à condition qu’ils aient des signatures différentes (nombre ou type des arguments). C’est ce qu’on appelle la **surcharge**.

Cela permet, par exemple, de créer un objet de différentes manières selon les informations dont on dispose.

```java
// Constructeur avec argument String
public Personne(String nom){
    this(nom, "Thomas");
}
// Constructeur avec argument int
public Personne(int nom){
    this(Integer.toString(nom));
    // Certes, cela n’a pas vraiment de sens ici, mais la surcharge est possible !
}
```

::: info
Le compilateur Java choisira automatiquement le constructeur approprié en fonction du nombre et du type des arguments fournis lors de la création de l’objet.
:::

---

Ainsi, les classes et leurs constructeurs sont les fondations de tout programme Java orienté objet. Bien les comprendre, c’est se donner les moyens de bâtir des programmes robustes et évolutifs.

::: tip Pour aller plus loin
Essayez de créer vos propres classes avec plusieurs constructeurs, et expérimentez la visibilité des attributs et des méthodes pour bien comprendre leur portée !
:::
