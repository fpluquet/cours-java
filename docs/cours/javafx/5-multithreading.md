# JavaFX et le multi-threading

Dans une application JavaFX, toutes les modifications de l'interface graphique doivent être effectuées dans le thread JavaFX (le thread principal de l'UI). Si tu veux mettre à jour l'interface depuis un autre thread (par exemple, après un calcul long ou une opération réseau), il faut utiliser `Platform.runLater()`.

::: info
Si tu modifies l'UI depuis un autre thread sans passer par `Platform.runLater`, tu risques des bugs difficiles à diagnostiquer !
:::

## Exemple

```java
Platform.runLater(() -> {
    // Code de mise à jour de l'interface, exécuté dans le thread JavaFX
    button.setText("Hello");
});
```

::: tip
Toujours utiliser `Platform.runLater` pour toute modification de l'UI depuis un thread secondaire.
:::
