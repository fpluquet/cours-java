# Les Streams

Les Streams sont une fonctionnalité puissante introduite en Java 8, qui permet de traiter des collections de données de manière déclarative en utilisant les expressions lambda.

::: tip Prérequis
Pour bien comprendre les Streams, assurez-vous de maîtriser les [interfaces fonctionnelles et les expressions lambda](/cours/java/19-lambda).
:::

## Qu'est-ce qu'un Stream ?

Un **Stream** (flux) est une séquence d'éléments sur laquelle on peut effectuer des opérations de manière déclarative, en chaînant des transformations. Introduits en Java 8, les streams permettent de traiter des collections de données de façon lisible et concise, en utilisant massivement les lambdas.

::: tip Analogie
Pensez à un Stream comme une **chaîne de montage** dans une usine :
- Les éléments arrivent un par un sur le tapis roulant (la source).
- Chaque poste de travail effectue une opération (filtre, transformation, tri…).
- À la fin de la chaîne, on récupère le produit fini (le résultat).
:::

::: warning Stream ≠ Collection
Un Stream **n'est pas** une collection. Il ne stocke pas de données. C'est un **pipeline de traitement** qui s'applique sur une source de données (souvent une collection). Un Stream ne peut être consommé **qu'une seule fois**.
:::

## Créer un Stream

Il existe plusieurs façons de créer un Stream :

```java
// À partir d'une collection
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie");
Stream<String> stream1 = noms.stream();

// À partir de valeurs directes
Stream<String> stream2 = Stream.of("Alice", "Bob", "Charlie");

// À partir d'un tableau
int[] tableau = {1, 2, 3, 4, 5};
IntStream stream3 = Arrays.stream(tableau);

// Stream infini (avec limite)
Stream<Integer> stream4 = Stream.iterate(0, n -> n + 2).limit(10);  // 0, 2, 4, ..., 18

// Stream généré
Stream<Double> stream5 = Stream.generate(Math::random).limit(5);
```

## Le pipeline d'un Stream

Un traitement par Stream suit toujours le même schéma en 3 étapes :

**1. Source** → **2. Opérations intermédiaires** → **3. Opération terminale**

```java
List<String> resultat = noms.stream()          // 1. Source
    .filter(n -> n.length() > 3)               // 2. Intermédiaire : filtrer
    .map(String::toUpperCase)                  // 2. Intermédiaire : transformer
    .sorted()                                  // 2. Intermédiaire : trier
    .collect(Collectors.toList());             // 3. Terminale : collecter
```

::: info Évaluation paresseuse (lazy)
Les opérations intermédiaires ne sont **pas exécutées immédiatement**. Elles ne sont déclenchées qu'au moment où une opération terminale est appelée. Cela permet d'optimiser le traitement en ne parcourant les éléments qu'une seule fois.
:::

## Opérations intermédiaires

Les opérations intermédiaires transforment un Stream en un autre Stream. Elles sont **paresseuses** : elles ne sont exécutées que lorsqu'une opération terminale est appelée.

### `filter(Predicate<T>)` — Filtrer les éléments

Ne garde que les éléments pour lesquels le prédicat retourne `true`.

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);

List<Integer> pairs = nombres.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// [2, 4, 6, 8]
```

### `map(Function<T, R>)` — Transformer chaque élément

Applique une fonction à chaque élément pour le transformer en un autre type.

```java
List<String> noms = Arrays.asList("alice", "bob", "charlie");

List<String> majuscules = noms.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// ["ALICE", "BOB", "CHARLIE"]

List<Integer> longueurs = noms.stream()
    .map(String::length)
    .collect(Collectors.toList());
// [5, 3, 7]
```

### `flatMap(Function<T, Stream<R>>)` — Aplatir des structures imbriquées

Transforme chaque élément en un Stream, puis **aplatit** tous ces streams en un seul.

```java
List<List<String>> listes = Arrays.asList(
    Arrays.asList("a", "b"),
    Arrays.asList("c", "d"),
    Arrays.asList("e")
);

List<String> aplati = listes.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
// ["a", "b", "c", "d", "e"]
```

Un usage courant est de découper des phrases en mots :

```java
List<String> phrases = Arrays.asList("Hello World", "Java Streams");

List<String> mots = phrases.stream()
    .flatMap(phrase -> Arrays.stream(phrase.split(" ")))
    .collect(Collectors.toList());
// ["Hello", "World", "Java", "Streams"]
```

### `sorted()` et `sorted(Comparator<T>)` — Trier

```java
List<String> noms = Arrays.asList("Charlie", "Alice", "Bob");

// Tri naturel (alphabétique)
List<String> tries = noms.stream()
    .sorted()
    .collect(Collectors.toList());
// ["Alice", "Bob", "Charlie"]

// Tri personnalisé (par longueur)
List<String> triesParLongueur = noms.stream()
    .sorted((a, b) -> Integer.compare(a.length(), b.length()))
    .collect(Collectors.toList());
// ["Bob", "Alice", "Charlie"]

// Avec Comparator.comparing (plus lisible)
List<String> triesParLongueur2 = noms.stream()
    .sorted(Comparator.comparing(String::length))
    .collect(Collectors.toList());
```

### `distinct()` — Supprimer les doublons

```java
List<Integer> nombres = Arrays.asList(1, 2, 2, 3, 3, 3, 4);

List<Integer> uniques = nombres.stream()
    .distinct()
    .collect(Collectors.toList());
// [1, 2, 3, 4]
```

### `limit(long n)` et `skip(long n)` — Limiter ou sauter

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

List<Integer> premiers3 = nombres.stream()
    .limit(3)
    .collect(Collectors.toList());
// [1, 2, 3]

List<Integer> sauf3premiers = nombres.stream()
    .skip(3)
    .collect(Collectors.toList());
// [4, 5, 6, 7, 8, 9, 10]
```

### `peek(Consumer<T>)` — Observer sans modifier

Utile pour le debugging : exécute une action sur chaque élément sans modifier le Stream.

```java
List<String> resultat = noms.stream()
    .filter(n -> n.length() > 3)
    .peek(n -> System.out.println("Après filtre : " + n))
    .map(String::toUpperCase)
    .peek(n -> System.out.println("Après map : " + n))
    .collect(Collectors.toList());
```

## Opérations terminales

Les opérations terminales **déclenchent** le traitement du pipeline et produisent un résultat final. Après une opération terminale, le Stream est consommé et ne peut plus être utilisé.

### `collect(Collector)` — Collecter dans une collection

C'est l'opération terminale la plus utilisée. La classe `Collectors` fournit de nombreux collecteurs prêts à l'emploi.

```java
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie", "Alice");

// En liste
List<String> liste = noms.stream()
    .collect(Collectors.toList());

// En ensemble (sans doublons)
Set<String> ensemble = noms.stream()
    .collect(Collectors.toSet());

// En chaîne de caractères avec séparateur
String joined = noms.stream()
    .collect(Collectors.joining(", "));
// "Alice, Bob, Charlie, Alice"

// Grouper par longueur
Map<Integer, List<String>> parLongueur = noms.stream()
    .collect(Collectors.groupingBy(String::length));
// {5=[Alice, Alice], 3=[Bob], 7=[Charlie]}

// Partitionner (séparer en deux groupes)
Map<Boolean, List<String>> partition = noms.stream()
    .collect(Collectors.partitioningBy(n -> n.length() > 4));
// {false=[Bob], true=[Alice, Charlie, Alice]}
```

### `forEach(Consumer<T>)` — Effectuer une action sur chaque élément

```java
noms.stream()
    .filter(n -> n.length() > 3)
    .forEach(n -> System.out.println(n));

// Équivalent avec référence de méthode
noms.stream()
    .filter(n -> n.length() > 3)
    .forEach(System.out::println);
```

### `count()` — Compter les éléments

```java
long nbLongs = noms.stream()
    .filter(n -> n.length() > 3)
    .count();
// 2 (Alice et Charlie)
```

### `reduce(BinaryOperator<T>)` — Réduire à une seule valeur

`reduce` combine tous les éléments du Stream en un seul résultat en appliquant une opération d'accumulation.

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5);

// Somme
int somme = nombres.stream()
    .reduce(0, (a, b) -> a + b);
// 15

// Équivalent avec référence de méthode
int somme2 = nombres.stream()
    .reduce(0, Integer::sum);

// Produit
int produit = nombres.stream()
    .reduce(1, (a, b) -> a * b);
// 120

// Concaténation de strings
List<String> mots = Arrays.asList("Java", "est", "super");
String phrase = mots.stream()
    .reduce("", (a, b) -> a + " " + b)
    .trim();
// "Java est super"
```

::: info `reduce` avec et sans valeur initiale
- `reduce(identité, accumulateur)` : retourne directement le type `T` (jamais vide grâce à la valeur initiale).
- `reduce(accumulateur)` : retourne un `Optional<T>` car la liste pourrait être vide.
```java
Optional<Integer> max = nombres.stream().reduce(Integer::max);
max.ifPresent(m -> System.out.println("Max : " + m));  // Max : 5
```
:::

### `findFirst()`, `findAny()` — Trouver un élément

```java
Optional<String> premier = noms.stream()
    .filter(n -> n.startsWith("C"))
    .findFirst();
// Optional["Charlie"]

premier.ifPresent(n -> System.out.println("Trouvé : " + n));
```

### `anyMatch`, `allMatch`, `noneMatch` — Vérifier des conditions

Ces opérations prennent un `Predicate<T>` et retournent un booléen.

```java
List<Integer> nombres = Arrays.asList(2, 4, 6, 8, 10);

boolean tousPairs = nombres.stream().allMatch(n -> n % 2 == 0);      // true
boolean auMoinsUnGrand = nombres.stream().anyMatch(n -> n > 9);      // true
boolean aucunNegatif = nombres.stream().noneMatch(n -> n < 0);       // true
```

### `min(Comparator)` et `max(Comparator)` — Minimum et maximum

```java
Optional<String> plusLong = noms.stream()
    .max(Comparator.comparing(String::length));
// Optional["Charlie"]

Optional<Integer> minimum = nombres.stream()
    .min(Integer::compare);
// Optional[2]
```

## Récapitulatif : les lambdas dans les Streams

| Opération | Type de lambda attendu | Exemple |
|---|---|---|
| `filter()` | `Predicate<T>` | `n -> n > 0` |
| `map()` | `Function<T, R>` | `s -> s.length()` |
| `flatMap()` | `Function<T, Stream<R>>` | `l -> l.stream()` |
| `sorted()` | `Comparator<T>` | `(a, b) -> a.compareTo(b)` |
| `peek()` | `Consumer<T>` | `s -> System.out.println(s)` |
| `forEach()` | `Consumer<T>` | `s -> System.out.println(s)` |
| `reduce()` | `BinaryOperator<T>` | `(a, b) -> a + b` |
| `collect()` | `Collector` | `Collectors.toList()` |
| `anyMatch()` | `Predicate<T>` | `s -> s.isEmpty()` |
| `min()` / `max()` | `Comparator<T>` | `Comparator.comparing(...)` |

---

## Exercices de compréhension

### Exercice 1 : Compléter les lambdas dans les Streams

Complétez les lambdas manquantes dans les pipelines suivants :

```java
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie", "Diana", "Eve");

// 1. Filtrer les noms de plus de 3 caractères
List<String> longs = noms.stream()
    .filter(_______________)
    .collect(Collectors.toList());

// 2. Transformer chaque nom en majuscule
List<String> majuscules = noms.stream()
    .map(_______________)
    .collect(Collectors.toList());

// 3. Trier par longueur décroissante
List<String> tries = noms.stream()
    .sorted(_______________)
    .collect(Collectors.toList());

// 4. Vérifier si tous les noms commencent par une majuscule
boolean tousCapitalized = noms.stream()
    .allMatch(_______________);

// 5. Concaténer tous les noms avec " - " comme séparateur
String resultat = noms.stream()
    .collect(_______________);

// 6. Calculer la somme des longueurs de tous les noms
int sommeLongueurs = noms.stream()
    .map(_______________)
    .reduce(0, _______________);
```

::: details Suggestions des réponses
1. `n -> n.length() > 3`
2. `String::toUpperCase` (ou `s -> s.toUpperCase()`)
3. `(a, b) -> Integer.compare(b.length(), a.length())` (ou `Comparator.comparing(String::length).reversed()`)
4. `n -> Character.isUpperCase(n.charAt(0))`
5. `Collectors.joining(" - ")`
6. `String::length` puis `Integer::sum` (ou `s -> s.length()` puis `(a, b) -> a + b`)
:::

### Exercice 2 : Lire et comprendre un pipeline Stream

Sans exécuter le code, déterminez le résultat de chaque pipeline :

```java
// 1.
List<Integer> nums = Arrays.asList(5, 3, 8, 1, 9, 2, 7);
List<Integer> res1 = nums.stream()
    .filter(n -> n > 4)
    .sorted()
    .collect(Collectors.toList());
// res1 = ___________

// 2.
List<String> mots = Arrays.asList("Java", "est", "un", "langage", "puissant");
String res2 = mots.stream()
    .filter(m -> m.length() > 2)
    .map(String::toUpperCase)
    .collect(Collectors.joining(" "));
// res2 = ___________

// 3.
List<Integer> nums2 = Arrays.asList(1, 2, 3, 4, 5);
int res3 = nums2.stream()
    .map(n -> n * n)
    .filter(n -> n > 10)
    .reduce(0, Integer::sum);
// res3 = ___________

// 4.
List<String> noms = Arrays.asList("Alice", "Bob", "Alice", "Charlie", "Bob");
long res4 = noms.stream()
    .distinct()
    .filter(n -> n.length() > 3)
    .count();
// res4 = ___________

// 5.
Map<Integer, List<String>> res5 = mots.stream()
    .collect(Collectors.groupingBy(String::length));
// res5 = ___________
```

::: details Suggestions des réponses
1. `[5, 7, 8, 9]` — filtre > 4 puis tri croissant
2. `"JAVA EST LANGAGE PUISSANT"` — filtre les mots de plus de 2 caractères, majuscule, jointure par espace
3. `41` — carrés : [1, 4, 9, 16, 25], filtre > 10 : [16, 25], somme = 41
4. `2` — distincts : [Alice, Bob, Charlie], filtre > 3 caractères : [Alice, Charlie], count = 2
5. `{2=[un], 3=[est], 4=[Java], 7=[langage], 8=[puissant]}` — groupement par longueur
:::

### Exercice 3 : Analyser et corriger

Identifiez les erreurs dans les codes suivants et proposez une correction :

```java
// Erreur 1
List<String> noms = Arrays.asList("Alice", "Bob");
Stream<String> s = noms.stream().filter(n -> n.length() > 3);
s.forEach(System.out::println);
s.forEach(System.out::println);  // ❌ Quelle est l'erreur ?

// Erreur 2
List<String> resultat = noms.stream()
    .map(n -> n.toUpperCase());  // ❌ Quelle est l'erreur ?
```

::: details Suggestions des réponses
1. Un Stream ne peut être consommé qu'**une seule fois**. Le deuxième `forEach` provoque une `IllegalStateException`. Il faut recréer le stream ou stocker les résultats dans une collection.
2. Il manque l'opération terminale. `.map()` est une opération intermédiaire, elle ne produit qu'un nouveau Stream. Il faut ajouter `.collect(Collectors.toList())` à la fin.
:::

---

## Exercices de production

### Exercice 1 : Gestion d'une liste d'étudiants

Créez une classe `Student` (nom, prénom, moyenne) et écrivez du code utilisant des lambdas et des streams pour :

```java
List<Student> etudiants = Arrays.asList(
    new Student("Dupont", "Alice", 15.5),
    new Student("Martin", "Bob", 12.0),
    new Student("Bernard", "Charlie", 18.5),
    new Student("Lefevre", "Diana", 14.0),
    new Student("Dupont", "Eve", 9.0),
    new Student("Martin", "Frank", 16.5)
);

// 1. Trier les étudiants par moyenne décroissante (utiliser Comparator.comparing + reversed())
// À compléter...

// 2. Afficher le nom complet (prénom + nom) de chaque étudiant ayant >= 14 (utiliser filter + map + forEach)
// À compléter...

// 3. Calculer la moyenne générale de la classe (utiliser mapToDouble + average)
// À compléter...

// 4. Grouper les étudiants par nom de famille (utiliser Collectors.groupingBy)
// À compléter...

// 5. Trouver l'étudiant avec la meilleure moyenne (utiliser max + Comparator)
// À compléter...

// 6. Vérifier si tous les étudiants ont au moins 10 de moyenne (utiliser allMatch)
// À compléter...

// 7. Partitionner les étudiants entre ceux qui ont réussi (>= 10) et les autres
// (utiliser Collectors.partitioningBy)
// À compléter...
```

### Exercice 2 : Traitement d'une liste de nombres avec Streams

Écrivez un programme complet en utilisant les streams :

```java
List<Integer> nombres = Arrays.asList(1, 5, 3, 8, 2, 7, 6, 4, 9, 10, 12, 15, 3, 7);

// 1. Obtenir la liste des nombres pairs triés en ordre croissant (filter + sorted + collect)
// À compléter...

// 2. Calculer la somme de tous les nombres impairs (filter + reduce)
// À compléter...

// 3. Créer une liste où chaque nombre est au carré, puis ne garder que ceux > 20 (map + filter)
// À compléter...

// 4. Compter les nombres distincts entre 3 et 7 inclus (filter + distinct + count)
// À compléter...

// 5. Trouver le plus grand nombre pair (filter + max)
// À compléter...

// 6. Calculer le produit de tous les nombres de 1 à 5 (limit + reduce)
// À compléter...

// 7. Obtenir les 3 plus petits nombres distincts sous forme de String "1, 2, 3"
//    (distinct + sorted + limit + map + Collectors.joining)
// À compléter...
```

### Exercice 3 : Streams et flatMap

Utilisez `flatMap` pour traiter des structures imbriquées :

```java
// Données
List<List<String>> classes = Arrays.asList(
    Arrays.asList("Alice", "Bob", "Charlie"),
    Arrays.asList("Diana", "Eve"),
    Arrays.asList("Frank", "Grace", "Heidi", "Ivan")
);

// 1. Obtenir une liste plate de tous les noms (flatMap)
// À compléter...

// 2. Compter le nombre total d'élèves
// À compléter...

// 3. Trouver tous les noms contenant la lettre 'a' (insensible à la casse)
// À compléter...

// 4. Obtenir la liste de tous les noms triés par longueur puis alphabétiquement
// À compléter...

// 5. À partir de phrases, extraire tous les mots uniques triés
List<String> phrases = Arrays.asList(
    "les lambdas sont utiles",
    "les streams sont puissants",
    "les lambdas et les streams sont complémentaires"
);
// À compléter...
```

### Exercice 4 : Collectors avancés

Explorez les différents collecteurs de la classe `Collectors` :

```java
List<String> mots = Arrays.asList("lambda", "interface", "abstrait", "java", 
    "fonctionnel", "code", "stream", "lambda", "java");

// 1. Grouper les mots par leur première lettre (Collectors.groupingBy)
// À compléter...

// 2. Grouper par longueur, mais ne garder que le nombre de mots par groupe
//    (Collectors.groupingBy + Collectors.counting)
// À compléter...

// 3. Partitionner entre mots courts (<= 5 caractères) et mots longs
//    (Collectors.partitioningBy)
// À compléter...

// 4. Joindre tous les mots distincts triés, séparés par " | ", 
//    précédés de "[" et suivis de "]"
//    (Collectors.joining avec préfixe/suffixe)
// À compléter...

// 5. Créer un Map<String, Integer> associant chaque mot distinct à sa longueur
//    (Collectors.toMap)
// À compléter...

// 6. Trouver le mot le plus long de chaque groupe de première lettre
//    (Collectors.groupingBy + Collectors.maxBy)
// À compléter...
```

### Exercice 5 : Reduce et accumulation

Utilisez `reduce` pour effectuer des calculs personnalisés :

```java
List<Integer> nombres = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 1. Calculer la somme des carrés : 1² + 2² + 3² + ... + 10²
// À compléter...

// 2. Calculer le factoriel de 10 (10!)
// À compléter...

// 3. Trouver le plus grand nombre sans utiliser max()
// À compléter...

// 4. Concaténer une liste de strings avec un accumulateur personnalisé
List<String> mots = Arrays.asList("Java", "est", "un", "langage");
// Résultat attendu : "Java est un langage"
// À compléter en utilisant reduce()...

// 5. Calculer la moyenne en utilisant reduce (sans utiliser average())
//    Indice : utiliser un reduce avec un accumulateur qui retient la somme et le compteur
// À compléter...
```

### Exercice 6 : Cas d'usage réel - Gestion d'une commande

Créez un système complet de gestion de commande en utilisant lambdas, interfaces fonctionnelles et streams :

```java
class Article {
    String nom;
    String categorie;
    double prix;
    int quantite;

    // Constructeur et getters...
}

public class GestionCommande {
    public static void main(String[] args) {
        List<Article> articles = Arrays.asList(
            new Article("Livre Java", "Livres", 35.99, 2),
            new Article("Stylo", "Fournitures", 1.50, 5),
            new Article("Cahier", "Fournitures", 4.99, 3),
            new Article("Crayon", "Fournitures", 0.75, 10),
            new Article("Livre Python", "Livres", 29.99, 1),
            new Article("USB-C Cable", "High-Tech", 12.99, 2)
        );

        // 1. Calculer le prix total de la commande (map au montant total + reduce)
        // À compléter...

        // 2. Afficher les articles coûtant plus de 5€ avec leur montant total (prix × qté)
        //    (filter + forEach avec Consumer)
        // À compléter...

        // 3. Grouper les articles par catégorie et afficher le sous-total par catégorie
        //    (Collectors.groupingBy + Collectors.summingDouble)
        // À compléter...

        // 4. Trouver l'article le plus cher (max + Comparator)
        // À compléter...

        // 5. Appliquer une remise via une Function<Double, Double> passée en paramètre :
        //    - 10% si total > 50€, 5% si total > 30€, 0% sinon
        //    Créer la Function et l'appliquer
        // À compléter...

        // 6. Créer un ticket formaté : chaque ligne = "nom x quantité = montant €"
        //    puis une ligne total (utiliser map + Collectors.joining)
        // À compléter...

        // 7. Trier les articles par catégorie puis par prix décroissant
        //    (sorted avec Comparator.comparing().thenComparing())
        // À compléter...
    }
}
```

### Exercice 7 : Chaîne de traitements complexe (Stream Chain)

Écrivez un programme qui utilise une chaîne complète de transformations :

```java
List<String> phrases = Arrays.asList(
    "Les lambdas simplifient le code Java",
    "Java 8 a apporté les streams et les lambdas",
    "La programmation fonctionnelle est puissante et élégante"
);

// En utilisant une seule chaîne de streams, effectuez :
// 1. Transformer chaque phrase en liste de mots (flatMap + split)
// 2. Convertir en minuscule
// 3. Filtrer les mots de moins de 4 caractères
// 4. Retirer les doublons
// 5. Trier par longueur décroissante, puis alphabétiquement en cas d'égalité
// 6. Collecter le résultat dans une liste

// À compléter avec une seule expression stream...
```

### Exercice 8 : Méthodes génériques avec interfaces fonctionnelles

Créez des méthodes utilitaires génériques qui acceptent des interfaces fonctionnelles en paramètres :

```java
public class Utils {
    // 1. Méthode qui filtre une liste selon un Predicate<T> et retourne une nouvelle liste
    public static <T> List<T> filtrer(List<T> liste, Predicate<T> condition) {
        // À compléter...
    }

    // 2. Méthode qui transforme une liste selon une Function<T, R>
    public static <T, R> List<R> transformer(List<T> liste, Function<T, R> transformation) {
        // À compléter...
    }

    // 3. Méthode qui applique une action (Consumer<T>) sur chaque élément validé par un Predicate<T>
    public static <T> void appliquerSi(List<T> liste, Predicate<T> condition, Consumer<T> action) {
        // À compléter...
    }

    // 4. Méthode qui combine deux listes élément par élément via une BiFunction
    public static <T, U, R> List<R> combiner(List<T> listeA, List<U> listeB, 
                                              BiFunction<T, U, R> combinaison) {
        // À compléter...
    }
    
    // Testez vos méthodes :
    public static void main(String[] args) {
        List<String> noms = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        
        // filtrer les noms de plus de 4 caractères
        // transformer les noms en leurs longueurs
        // afficher les noms courts (< 4 caractères) en majuscule
        // combiner noms et longueurs en "Alice (5)"
    }
}
```

---

::: tip Conseils pour les exercices
- Utilisez les méthodes `.stream()` et `.collect()` autant que possible
- Pensez à utiliser `Collectors.toList()`, `Collectors.groupingBy()`, `Collectors.joining()`, etc.
- Exploitez la composition (`andThen`, `compose`, `and`, `or`, `negate`) pour construire des comportements complexes
- Préférez les références de méthode (`::`) quand la lambda ne fait qu'appeler une méthode existante
- Testez votre code en ayant des cas de test variés
:::
