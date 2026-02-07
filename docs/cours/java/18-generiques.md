# Les classes génériques

Les classes génériques sont un concept fondamental en Java pour écrire du code réutilisable, sûr et flexible. Elles permettent de définir des classes, interfaces ou méthodes qui fonctionnent avec différents types, tout en conservant la sécurité de typage.

::: tip À retenir
Les génériques évitent les conversions de type (cast) et les erreurs à l’exécution, en permettant de spécifier le type dès la compilation.
:::

## C'est quoi ?

Les classes génériques permettent de définir des classes et des méthodes paramétrées par un ou plusieurs types. On utilise des chevrons `<T>`, où `T` est un paramètre de type (on peut aussi utiliser `E`, `K`, `V`, etc.).

::: info
Le nom du type générique est libre, mais par convention on utilise une lettre majuscule (T pour Type, E pour Element, K pour Key, V pour Value…)
:::

## Exemple

Voici un exemple de classe générique simple :

```java
class Boite<T> {
    private T contenu;
    public void set(T contenu) {
        this.contenu = contenu;
    }
    public T get() {
        return contenu;
    }
}

Boite<Integer> boiteInt = new Boite<>();
boiteInt.set(5);
System.out.println(boiteInt.get()); // Affiche 5

Boite<String> boiteStr = new Boite<>();
boiteStr.set("Hello");
System.out.println(boiteStr.get()); // Affiche Hello
```

Dans cet exemple, la classe `Boite` peut contenir n’importe quel type d’objet, sans perdre la sécurité de typage.

::: tip Important
- Si vous essayez de faire `boiteInt.set("texte")`, vous aurez une erreur de compilation : le type est vérifié dès la compilation.
- Les génériques sont très utilisés dans les collections (`ArrayList<T>`, `HashMap<K,V>`, etc.).
:::

## Aller plus loin : les bornes (borned types)

On peut restreindre le type accepté par un générique grâce au mot-clé `extends`. Cela permet de garantir que le type utilisé hérite d’une certaine classe ou implémente une interface donnée.

### Exemple : borne supérieure avec `extends`

```java
class BoiteNombre<T extends Number> {
    private T contenu;
    public void set(T contenu) {
        this.contenu = contenu;
    }
    public T get() {
        return contenu;
    }
    public double getDoubleValue() {
        return contenu.doubleValue();
    }
}

BoiteNombre<Integer> boiteInt = new BoiteNombre<>();
boiteInt.set(42);
System.out.println(boiteInt.getDoubleValue()); // Affiche 42.0

// BoiteNombre<String> boiteStr = new BoiteNombre<>(); // Erreur de compilation !
```

Ici, `BoiteNombre<T extends Number>` signifie que T doit être une sous-classe de `Number` (comme `Integer`, `Double`, etc.). On peut donc utiliser les méthodes de `Number` sur `contenu`.

::: info
On peut aussi utiliser `T extends UneInterface` pour forcer le type à implémenter une interface.
:::

### Exemple : plusieurs bornes

On peut même combiner plusieurs contraintes avec `&` :

```java
class BoiteSpeciale<T extends Number & Comparable<T>> {
    // ...
}
```

Ici, T doit être à la fois un `Number` et implémenter `Comparable<T>`.

---

*Les bornes rendent les génériques encore plus puissants et sûrs, en permettant d’exprimer des contraintes métier directement dans la déclaration de classe ou de méthode !*

---

*Essayez de créer une classe générique qui prend deux types (par exemple, une paire clé/valeur) pour bien comprendre la puissance des génériques !*
