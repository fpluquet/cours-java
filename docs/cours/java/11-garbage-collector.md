# Garbage collector

En Java, la gestion de la mémoire est automatisée grâce au **garbage collector**. Cela signifie que, contrairement à certains langages comme le C, vous n’avez pas à libérer manuellement la mémoire occupée par les objets que vous n’utilisez plus. Le garbage collector s’en charge pour vous, ce qui simplifie grandement le développement et limite les risques de fuites de mémoire.

::: tip À retenir
Le garbage collector détruit automatiquement les objets qui ne sont plus accessibles dans votre programme. Vous n’avez donc pas à vous soucier de la libération de la mémoire !
:::

## GarbaQuoi ?

Tout comme en C#, Java inclut un garbage collector. Son rôle est de surveiller la mémoire et de supprimer les objets qui ne sont plus référencés nulle part dans le code. Cela permet d’éviter que la mémoire ne soit saturée par des objets inutiles.

::: info
Un objet devient « candidat à la suppression » dès qu’il n’est plus accessible par aucune variable ou référence active.
:::

Il est possible de demander explicitement au garbage collector de faire une passe, mais cela reste très rare et n’est pas garanti :

```java
System.gc(); // Demande au garbage collector de s’exécuter
// Très peu utilisé. Il est rare d'appeler le GC soi-même
```

::: info
L’appel à `System.gc()` n’est qu’une demande. Le garbage collector peut choisir de l’ignorer.
:::

## Méthode `finalize()`

La méthode `finalize()` est définie dans la classe `Object`. Toutes les classes héritent donc de cette méthode, que l’on peut surcharger pour exécuter du code juste avant la destruction d’un objet par le garbage collector.

```java
public class Personne {
    private String nom;
    private String prenom;
    private static int NombreDePersonnes;
    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println(String.format("Personne supprimée : %s %s", this.nom, this.prenom));
        NombreDePersonnes--;
    }
}
```

::: warning Attention
L’utilisation de `finalize()` est déconseillée. Son exécution n’est pas garantie (la méthode peut ne jamais être appelée), et elle est désormais obsolète dans les versions récentes de Java. Préférez d’autres mécanismes pour libérer des ressources (ex : blocs `try-with-resources`).
:::

---

Ainsi, le garbage collector est un allié précieux pour la gestion de la mémoire en Java. Il vous permet de vous concentrer sur la logique de votre programme, sans avoir à gérer la libération des objets inutiles. Mais gardez à l’esprit que certains comportements (comme `finalize()` ou l’appel manuel à `System.gc()`) sont à utiliser avec beaucoup de précaution, voire à éviter dans la plupart des cas.
