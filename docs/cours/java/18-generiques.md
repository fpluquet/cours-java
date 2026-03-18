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
## Les méthodes génériques

Jusqu'ici, nous avons vu comment rendre une **classe** générique. Mais il est aussi possible de rendre une **méthode** générique, indépendamment de la classe qui la contient. Cela signifie que le paramètre de type est déclaré au niveau de la méthode, et non au niveau de la classe.

### Syntaxe

Le paramètre de type se déclare entre `<>` **avant le type de retour** de la méthode. Une fois déclaré, ce type peut être utilisé **partout dans la méthode** : comme type de paramètre, comme type de retour, comme type de variable locale, etc.

```java
public <T> void afficher(T element) {
    System.out.println(element);
}
```

Ici, `T` est utilisé comme **type de paramètre**. Mais on peut aussi l'utiliser comme **type de retour** :

```java
public <T> T premier(T[] tableau) {
    return tableau[0];
}
```

Ou encore comme **type de variable locale** dans le corps de la méthode :

```java
public <T> T dupliquerEtAfficher(T element) {
    T copie = element; // T utilisé comme type de variable locale
    System.out.println(copie);
    return copie;       // T utilisé comme type de retour
}
```

::: info
En résumé, le type `T` déclaré dans `<T>` est utilisable **exactement comme un type classique** à l'intérieur de la méthode : paramètres, retour, variables locales, création de tableaux, etc.
:::

### Pourquoi utiliser des méthodes génériques ?

Les méthodes génériques sont utiles lorsque :

- On veut écrire une méthode **utilitaire** qui fonctionne avec n'importe quel type, sans devoir rendre toute la classe générique.
- On veut une méthode **statique** générique (les méthodes statiques ne peuvent pas utiliser le paramètre de type de la classe).

::: warning Attention
Une méthode **statique** ne peut pas utiliser le type générique de la classe (`T` dans `class Boite<T>`), car les paramètres de type de la classe sont liés à une **instance**. Pour qu'une méthode statique soit générique, elle doit déclarer son **propre** paramètre de type.
:::

### Exemple concret

```java
class Utilitaires {
    // Méthode statique générique : échange deux éléments dans un tableau
    public static <T> void echanger(T[] tableau, int i, int j) {
        T temp = tableau[i];
        tableau[i] = tableau[j];
        tableau[j] = temp;
    }
}

String[] mots = {"Bonjour", "le", "monde"};
Utilitaires.echanger(mots, 0, 2);
System.out.println(Arrays.toString(mots)); // [monde, le, Bonjour]

Integer[] nombres = {1, 2, 3};
Utilitaires.echanger(nombres, 0, 1);
System.out.println(Arrays.toString(nombres)); // [2, 1, 3]
```

Dans cet exemple, la méthode `echanger` fonctionne avec n'importe quel type de tableau, sans avoir besoin de rendre la classe `Utilitaires` générique.

### Inférence de type

En général, le compilateur **déduit automatiquement** le type `T` à partir des arguments passés. On n'a donc pas besoin de le préciser explicitement :

```java
// Le compilateur déduit que T = String
Utilitaires.echanger(mots, 0, 2);

// Mais on peut aussi le préciser explicitement si nécessaire
Utilitaires.<String>echanger(mots, 0, 2);
```

### Méthode générique avec plusieurs paramètres de type

Une méthode peut déclarer plusieurs paramètres de type :

```java
public static <K, V> String formaterPaire(K cle, V valeur) {
    return cle + " = " + valeur;
}

System.out.println(formaterPaire("age", 25)); // age = 25
System.out.println(formaterPaire(1, "un"));   // 1 = un
```

::: tip À retenir
- Le paramètre de type d'une méthode générique se déclare **avant** le type de retour : `<T> void maMethode(T t)`.
- Le compilateur déduit le type automatiquement la plupart du temps.
- Les méthodes génériques sont indispensables pour les méthodes **statiques** qui doivent travailler avec des types paramétrés.
- Les bornes (`extends`) s'appliquent aussi aux méthodes génériques (voir section suivante).
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
