# Les boucles en Java

Répéter une action plusieurs fois, parcourir une collection, attendre une condition… Les boucles sont les alliées du programmeur pour automatiser et structurer la répétition. Java propose plusieurs types de boucles, chacune adaptée à un usage précis.

## La boucle `for` (classique)

La boucle `for` est idéale lorsque vous connaissez à l’avance le nombre d’itérations à effectuer. Elle se compose de trois parties : l’initialisation, la condition de poursuite, et l’incrémentation.

```java
for(int i = 0; i < 10; i++){
    // Code ici
}
```
Dans cet exemple, la variable `i` commence à 0, la boucle s’exécute tant que `i < 10`, et `i` est incrémenté à chaque tour. C’est la boucle de prédilection pour parcourir des tableaux ou effectuer un nombre précis de répétitions.

## La boucle `foreach` (boucle for améliorée)

Lorsque vous souhaitez parcourir tous les éléments d’une collection (tableau, liste…), la boucle `foreach` rend le code plus lisible et évite les erreurs d’indexation.

```java
// args est de type String[]
for(String s : args){
    // Code ici
}
```
Ici, chaque élément du tableau `args` est successivement stocké dans la variable temporaire `s`, et le bloc de code s’exécute pour chaque valeur.

## Les autres boucles : `while` et `do...while`

Java propose aussi les boucles `while` et `do...while`, parfaites lorsque le nombre d’itérations n’est pas connu à l’avance et dépend d’une condition dynamique.

```java
while(condition){
    // Code ici
}

do{
    ...  
}while(condition);
```
- La boucle `while` vérifie la condition avant chaque itération : si la condition est fausse dès le départ, le bloc n’est jamais exécuté.
- La boucle `do...while` garantit au moins une exécution du bloc, car la condition n’est testée qu’après le premier passage.

Grâce à ces différentes boucles, vous pouvez contrôler le flux de votre programme et automatiser toutes sortes de traitements répétitifs, du plus simple au plus complexe.
