# Qualité de code : découplage et cohésion

La qualité de code est un critère fondamental pour tout développeur qui souhaite écrire des programmes robustes, évolutifs et faciles à maintenir. Avant même de parler d'architecture comme MVC, il est essentiel de comprendre deux notions clés : le découplage et la cohésion.

> **Info :**
> Un code de qualité n'est pas seulement « qui fonctionne », mais « qui reste compréhensible et modifiable dans le temps ».

## Les deux piliers de la qualité de code

- **Découplage** : limiter les dépendances entre les classes/modules. Plus deux parties du code sont indépendantes, plus il est facile de les modifier ou de les réutiliser.
- **Cohésion** : chaque classe/module doit avoir une seule responsabilité claire. Cela rend le code plus lisible, plus simple à tester et à faire évoluer.

Une bonne architecture vise à maximiser le découplage et la cohésion, pour rendre le code plus maintenable et évolutif.

> **À retenir :**
> Un code bien découpé et cohésif est plus facile à relire, à corriger et à faire évoluer, même plusieurs mois après l'avoir écrit !

---

## Découplage

Le **découplage** désigne le fait de limiter les liens directs entre différentes parties du code.

Deux classes sont dites couplées si elles dépendent l'une de l'autre. Un fort couplage rend le code difficile à modifier et à maintenir : un changement dans une classe peut casser l'autre.

**Exemple** : si la classe Vue dépend directement de la classe Modèle, tout changement dans le modèle peut casser la vue.

> **Info :**
> Pour découpler, on utilise souvent des interfaces, des listeners ou des injections de dépendances.

Le découplage consiste à limiter ces dépendances, ce qui permet de remplacer ou de modifier une partie du code sans tout casser.

**Exemple réel de découplage** :

Supposons une application de messagerie :

```java
// Interface pour notifier un nouvel événement
public interface MessageListener {
    void onMessageReceived(String message);
}

// Classe qui gère la réception des messages
public class MessageReceiver {
    private MessageListener listener;
    public void setListener(MessageListener listener) {
        this.listener = listener;
    }
    public void recevoirNouveauMessage(String message) {
        if (listener != null) {
            listener.onMessageReceived(message);
        }
    }
}

// Classe qui affiche le message (vue)
public class MessageView implements MessageListener {
    @Override
    public void onMessageReceived(String message) {
        System.out.println("Nouveau message : " + message);
    }
}
```

Ici, `MessageReceiver` ne dépend pas directement de `MessageView` : il ne connaît que l'interface `MessageListener`. On peut donc changer la vue sans toucher au code de réception.

---

## Cohésion

La **cohésion** mesure à quel point les éléments d'une même classe ou module travaillent ensemble pour une même tâche.

Une classe est cohésive si elle a une seule responsabilité claire.

**Exemple** : la classe `Personne` ne gère que les données d'une personne, pas l'affichage ou la gestion des événements.

Une bonne cohésion rend le code plus lisible et plus facile à tester.

> **À éviter :**
> Une classe qui fait « un peu de tout » est difficile à comprendre et à maintenir. Privilégiez des classes simples et spécialisées.

**Exemple réel de cohésion** :

```java
// Classe cohésive : gère uniquement les opérations mathématiques
public class Calculatrice {
    public int addition(int a, int b) { return a + b; }
    public int soustraction(int a, int b) { return a - b; }
    public int multiplication(int a, int b) { return a * b; }
    public int division(int a, int b) { return a / b; }
}

// Classe peu cohésive (à éviter)
public class Utilitaire {
    public int addition(int a, int b) { return a + b; }
    public void afficherMessage(String msg) { System.out.println(msg); }
    public void sauvegarderFichier(String nom) { /* ... */ }
}
```

La classe `Calculatrice` est cohésive : elle ne fait qu'une seule chose (calculs). La classe `Utilitaire` mélange des responsabilités sans lien direct.

---

## Découplage et cohésion dans MVC

Une classe bien conçue est à la fois peu couplée et très cohésive.

L'architecture MVC favorise ces deux qualités :
- Le modèle, la vue et le contrôleur ont chacun une responsabilité claire (**cohésion**)
- Ils communiquent via des interfaces ou des méthodes bien définies, sans dépendre directement les uns des autres (**découplage**)

Cela rend l'application plus robuste et plus facile à faire évoluer.

> **À retenir :**
> MVC est un excellent exemple d'architecture qui pousse à écrire du code de qualité, en séparant bien les rôles et en limitant les dépendances.

---

## Sources

- [Wikipedia - Modèle-vue-contrôleur](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur)
- [OpenClassrooms - MVC](https://openclassrooms.com/fr/courses/6175841-concevez-une-application-web-en-python-avec-flask/6180121-decoupez-votre-application-avec-le-pattern-mvc)
- [Oracle JavaFX MVC Tutorial](https://docs.oracle.com/javase/8/javase-clienttechnologies.htm)
