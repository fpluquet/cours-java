# Utiliser un Controller Factory avec JavaFX

Dans certains cas avancés, il peut être utile de personnaliser la création des contrôleurs FXML en JavaFX. Par exemple, pour injecter des dépendances, partager des services, ou passer des paramètres au contrôleur. Pour cela, JavaFX propose le mécanisme de **Controller Factory**.

## Qu'est-ce qu'une Controller Factory ?

La Controller Factory est une fonction (ou lambda) que l'on fournit au `FXMLLoader` pour contrôler la façon dont les instances de contrôleurs sont créées. Par défaut, JavaFX instancie les contrôleurs avec un constructeur sans argument. Avec une factory, on peut :
- Utiliser un constructeur personnalisé
- Injecter des services ou des objets
- Réutiliser des instances existantes

## Exemple simple : injection d'un service

Supposons que l'on souhaite injecter un service dans un contrôleur FXML :

```java
public class MyController {
    private final MyService service;
    public MyController(MyService service) {
        this.service = service;
    }
    // ...
}
```

Dans le code Java qui charge le FXML :

```java
MyService service = new MyService();
FXMLLoader loader = new FXMLLoader(getClass().getResource("myfxml.fxml"));
loader.setControllerFactory(type -> {
    if (type == MyController.class) {
        return new MyController(service);
    } else {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
});
Parent root = loader.load();
```

**Explication :**
- On crée le service à injecter.
- On configure le `FXMLLoader` avec `setControllerFactory`.
- Si le contrôleur demandé est `MyController`, on le crée avec le service.
- Sinon, on utilise le constructeur par défaut.

## Utilisation avec plusieurs contrôleurs

On peut adapter la factory pour gérer plusieurs types de contrôleurs et injecter différents services ou objets selon le besoin.

```java
loader.setControllerFactory(type -> {
    if (type == MenuBarController.class) {
        return new MenuBarController(menuService);
    } else if (type == SidebarController.class) {
        return new SidebarController(userService);
    } else {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
});
```

## Astuces et bonnes pratiques
- La factory permet d’intégrer JavaFX avec des frameworks d’injection de dépendances (Spring, Guice, etc.).
- On peut aussi l’utiliser pour passer des paramètres dynamiques (ex : un identifiant, un modèle, etc.) au contrôleur.
- Toujours prévoir un fallback (constructeur par défaut) pour les contrôleurs qui ne nécessitent pas d’injection.
- Documenter les dépendances attendues dans chaque contrôleur.

## À retenir
La Controller Factory est un outil puissant pour personnaliser la création des contrôleurs FXML, injecter des dépendances, et rendre vos applications JavaFX plus modulaires et testables.
