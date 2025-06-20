# Les `ArrayList`s

Les tableaux en Java sont très utiles, mais ils ont une limite : leur taille est fixe. Si vous voulez ajouter ou retirer des éléments dynamiquement, il vaut mieux utiliser une structure plus souple : l’`ArrayList`.

> **À retenir** : Une `ArrayList` est une collection dynamique qui peut grandir ou rétrécir à volonté, contrairement aux tableaux classiques.

## Création d'une `ArrayList`

Une `ArrayList` est un objet de la bibliothèque Java. Pour l’utiliser, il faut l’importer :

```java
import java.util.ArrayList;
```

On peut ensuite créer une liste typée (recommandé) :

```java
ArrayList<Integer> list = new ArrayList<>(); // Liste d'entiers
```

> **Info** : Toujours préciser le type entre chevrons (`<Integer>`, `<String>`, etc.) pour éviter les erreurs et profiter du typage fort de Java.

Il est aussi possible de créer une liste non typée (déconseillé) :

```java
ArrayList list = new ArrayList(); // Tous les éléments sont alors des Object
```

## Modifier une liste

Pour ajouter un élément :

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);
```

Pour enlever un élément à un certain index :

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(10);
list.remove(0); // Supprime l'élément à l'index 0
```

> **Attention** : Les indices commencent à 0, comme pour les tableaux.

## Parcourir une liste

Pour accéder à un élément précis :

```java
ArrayList<Integer> listeEntiers = new ArrayList<>();
listeEntiers.add(1);
System.out.println(listeEntiers.get(0)); // Affiche "1"
```

Pour parcourir toute la liste, on peut utiliser une boucle for-each :

```java
ArrayList<Integer> listeEntiers = new ArrayList<>();
listeEntiers.add(1);
listeEntiers.add(2);
for(int i : listeEntiers) {
    System.out.println(i);
}
// Affiche "1" puis "2"
```

Ou une boucle for classique :

```java
ArrayList<Integer> listeEntiers = new ArrayList<>();
listeEntiers.add(1);
listeEntiers.add(2);
for(int i = 0; i < listeEntiers.size(); i++) {
    System.out.println(listeEntiers.get(i));
}
// Affiche aussi "1" puis "2"
```

> **Attention** : Pour connaître la taille d’une `ArrayList`, on utilise la méthode `size()` (et non `length`).

---

Les `ArrayList`s sont idéales pour manipuler des collections dont la taille varie au cours de l’exécution. Pour des besoins plus avancés (file, pile, ensemble sans doublons…), explorez aussi les autres collections de Java (`LinkedList`, `HashSet`, etc.).

> **Pour aller plus loin** : Essayez d’utiliser des `ArrayList` avec vos propres objets, ou de combiner plusieurs méthodes (`add`, `remove`, `contains`, etc.) pour bien comprendre leur fonctionnement !
