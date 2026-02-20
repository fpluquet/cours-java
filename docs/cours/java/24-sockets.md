# Programmation réseau avec les sockets en Java

La programmation réseau permet à plusieurs programmes de communiquer entre eux, même s'ils sont sur des machines différentes. En Java, cela se fait principalement à l'aide des sockets. Un socket est un point de communication qui permet d'envoyer et de recevoir des données à travers le réseau.

## Concepts de base
- **Socket** : Point de communication entre deux machines. Chaque socket est identifié par une adresse IP et un numéro de port.
- **ServerSocket** : Côté serveur, il attend les connexions entrantes sur un port donné. Lorsqu'un client se connecte, le serveur accepte la connexion et obtient un objet `Socket` pour dialoguer avec ce client.
- **InputStream/OutputStream** : Permettent de lire et d'écrire des données sur la connexion réseau. En général, on les encapsule dans des classes plus pratiques comme `BufferedReader` et `PrintWriter` pour manipuler des chaînes de caractères.



## Fonctionnement général
- Le **serveur** crée un `ServerSocket` et attend qu'un client se connecte (appel à `accept()`).
- Le **client** crée un `Socket` et se connecte à l'adresse IP et au port du serveur.
- Une fois la connexion établie, les deux peuvent s'envoyer des messages via les flux d'entrée/sortie.
- À la fin, il faut toujours fermer les sockets pour libérer les ressources.

## Exemple de serveur simple
```java
import java.net.*;
import java.io.*;

public class Serveur {
    public static void main(String[] args) throws IOException {
        ServerSocket serveur = new ServerSocket(1234);
        System.out.println("En attente de connexion...");
        Socket client = serveur.accept();
        System.out.println("Client connecté !");
        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        PrintWriter out = new PrintWriter(client.getOutputStream(), true);
        out.println("Bienvenue !");
        String ligne = in.readLine();
        System.out.println("Reçu : " + ligne);
        client.close();
        serveur.close();
    }
}
```

## Exemple de client simple
```java
import java.net.*;
import java.io.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 1234);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        System.out.println(in.readLine());
        out.println("Bonjour serveur !");
        socket.close();
    }
}
```

## Utilisation du multithreading pour communiquer dans les deux sens

Dans une application réseau réelle, il est souvent nécessaire d'écouter et d'envoyer des messages en même temps. Par exemple, un client de chat doit pouvoir envoyer un message tout en continuant à recevoir ceux du serveur. Pour cela, on utilise le multithreading :
- Un thread s'occupe d'écouter les messages entrants.
- Un autre thread s'occupe d'envoyer les messages (par exemple, ceux tapés par l'utilisateur).

### Exemple côté serveur : gérer plusieurs clients
Pour que le serveur puisse gérer plusieurs clients en même temps, il crée un thread par client :
```java
import java.net.*;
import java.io.*;

public class ServeurMulti {
    public static void main(String[] args) throws IOException {
        ServerSocket serveur = new ServerSocket(1234);
        System.out.println("Serveur prêt");
        while (true) {
            Socket client = serveur.accept();
            new Thread(new ClientHandler(client)).start();
        }
    }
}

class ClientHandler implements Runnable {
    private Socket client;
    public ClientHandler(Socket client) { this.client = client; }
    public void run() {
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            PrintWriter out = new PrintWriter(client.getOutputStream(), true);
            out.println("Bienvenue !");
            String ligne;
            while ((ligne = in.readLine()) != null) {
                System.out.println("Reçu : " + ligne);
                out.println("Echo : " + ligne);
            }
            client.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Exemple côté client : écouter et envoyer en même temps
Le client peut utiliser deux threads : un pour lire les messages du serveur, un pour envoyer ce que l'utilisateur tape au clavier.
```java
import java.net.*;
import java.io.*;

public class ClientMulti {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 1234);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader clavier = new BufferedReader(new InputStreamReader(System.in));

        // Thread pour écouter le serveur
        new Thread(() -> {
            try {
                String ligne;
                while ((ligne = in.readLine()) != null) {
                    System.out.println("Serveur : " + ligne);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();

        // Thread principal : envoi des messages
        String texte;
        while ((texte = clavier.readLine()) != null) {
            out.println(texte);
        }
        socket.close();
    }
}
```

## Envoyer des objets via la sérialisation

En Java, il est possible d'envoyer non seulement des chaînes de caractères, mais aussi des objets complets à travers un socket. Pour cela, on utilise la sérialisation (que l'on a déjà vue dans le chapitre sur les fichiers) : l'objet est transformé en une suite d'octets, transmise sur le réseau, puis reconstruite (désérialisée) de l'autre côté.

Pour cela, il faut :
- Que la classe de l'objet à transmettre implémente l'interface `Serializable`.
- Utiliser `ObjectOutputStream` et `ObjectInputStream` à la place de `PrintWriter` et `BufferedReader`.

### Exemple d'envoi d'un objet
Supposons une classe simple :
```java
import java.io.Serializable;
public class Message implements Serializable {
    private String texte;
    public Message(String texte) { this.texte = texte; }
    public String getTexte() { return texte; }
}
```

#### Côté serveur
```java
ObjectInputStream in = new ObjectInputStream(client.getInputStream());
Object obj = in.readObject();
if (obj instanceof Message) {
    Message m = (Message) obj;
    System.out.println("Reçu : " + m.getTexte());
}
```

#### Côté client
```java
ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
Message m = new Message("Bonjour serveur !");
out.writeObject(m);
out.flush();
```

::: info
La sérialisation permet d'envoyer des objets complexes (listes, objets personnalisés, etc.) très facilement, mais il faut que toutes les classes utilisées soient bien `Serializable`.
:::

## À retenir
- Toujours fermer les sockets après utilisation.
- Gérer les exceptions réseau (IOException).
- Utiliser des threads pour gérer plusieurs clients côté serveur et pour permettre au client d'écouter et d'envoyer en même temps.
- Bien séparer la logique d'écoute et d'envoi pour éviter les blocages.
