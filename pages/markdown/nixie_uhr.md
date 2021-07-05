# Nixie Uhr

## Einleitung

Die Nixie-Uhr, ein Klassiker für jeden Elektronik Hobbybastler. Das war so ein Projekt, das ich vor ewigen Zeiten mal angefangen aber nie fertiggestellt habe. Jetzt aber wird es Zeit, dass ich die Uhr endlich mal fertig stelle. Alle Schaltpläne und Programme werden auf GitHub veröffentlicht und das Projekt auf meiner Webseite dokumentiert.

![Nixie Röhre](../../img/IN-8_nixie.jpg)


## Hardware
### Netzteil

Die erste Frage ist: wie betreibe ich die Nixie Röhren? Das Modell, das ich verwende hat eine Zündspannung von 180V DC, eine Brennspannung von 150V und einen Anodenstrom von 2mA.

![IN-8 Datenblatt](../../img/IN-8.pdf)

Die erstbeste Möglichkeit wäre, ein Transformator basiertes Netzteil zu verwenden. Der Aufbau eines solchen Netzteil ist sehr simpel, es gibt jedoch einen Nachteil: Die Uhr soll eine Freistehende Platine haben und ein großer Trafo der an der Unterseite hängt, sieht nicht wirklich ansehnlich aus. Dazu kommt noch, dass freiliegende Netzspannung sehr gefählich ist.

Ich habe mich dafür entschieden einen 12V auf 180V DC-DC-Wandler zu entwerfen. Normalerweise werden Schaltnetzteile immer instabiler je größer die Differenz zwischen Eingangs- und Ausgangsspannung ist. Vor Allem wenn große Lasten angeschlossen werden. Durch den geringen Betriebstrom der Nixies sollte das aber kein Problem darstellen.

Als Inspiration habe ich mir verschiedenste Netzteilenwürfe angeschaut. Ich bin dann auf den Artikel von Threeneuron gestoßen, der die Vor- und Nachteile von verschiedenen Netzteildesigns für die Versorgung von Nixies aufgelistet hat und erklärt, was bei einem guten Netzteildesign zu beachten ist.

![Threeneuron Netzteil](../../img/threeneuron_netzteil.gif)

Ich habe mir sein Design MK1.5 mit dem MC34063 Schalt-IC als Vorlage genommen und auf meine Bedürfnisse angepasst. Erstens sollte das Design vollständig SMD basiert sein, damit es sich schön auf der Unterseite der Platine verstecken kann. Zweitens habe ich für die Feinjustage der Spannung noch einen Trimmerwiderstand einbaut und ein paar Bauteile angepasst auf welche, die ich schon da habe. Unten ist mein Entwurf in Eagle.

![Nixie Netzteil Design](../../img/netzteil_schaltung.png)

### Ansteuerung

Ich einen Prototyp gebaut und getestet. Danach habe ich den Schaltplan des Netzteils auf die Nixie Uhr Platine kopiert und die komplette Platine fertig entworfen. Jetzt sollte ich darauf eingehen, wie ich die einzelnen Pins der Nixies am besten schalte, denn jede Ziffer ist eine eigene Kathode und alle Ziffern teilen sich ein Anodengitter.

![Nixie Netzteil Prototyp](../../img/netzteil_prototyp.jpg)

Eine Möglichkeit währe, einen MOSFET für jeden Pin zu verwenden, aber daführ bräuchte ich 60 MOSFETs für alle 6 Röhren und das ist garantiert keine gute Lösung. Dann gäbe es noch die Möglichkeit spezielle Treiberchips zu verwenden: entweder die traditionellen 74LS141, das speziell für Nixie Röhren ausgelegt ist oder ein Latch-Array, welches hohe Spannungen aushält.

Ich hab mich für 6 74LS141 entschieden. Einfach gesagt funktionieren diese nur wie BCD auf Dezimal Umsetzer aber für Nixie Röhren. Jetzt hab ich aber immer noch die BCD Eingänge zu schalten, was 24 Pins entspricht. Da die pins nicht sehr schnell geschaltet werden müssen, kann ich ganz einfach 3 8-Bit Schieberegister benutzen, in diesem Fall 74HC595. Die fertige Platine sieht dann wie folgt aus:

![Nixie Platine]()

Kleine Anmerkung: Ich habe unter jeder Röhre noch eine kleine, blaue LED plaziert. Das wird bei Nixie Uhren öfter gemacht, weil das blaue Licht im Kontrast mit dem warmen orangen Leuchten der Nixie Röhren einen tollen Effekt erzielt.


## Software
### Uhrzeit

Das Programm ist recht simpel. Der interne RTC des Arduino hält die aktuelle Zeit und diese muss nur noch über die Schieberegister richtig formatiert ausgegeben werden.

### Blynk

Wie meine anderen Projekte auch, will ich die Nixie Uhr in mein Blynk Netzwerk mit einbauen. Mit meinem Handy kann ich die Helligkeit Röhren und blauen LEDs einstellen und die Uhrzeit einstellen stellen. Die Blynk Bibliothek habe ich in meinem LED Beleuchtungs Projekt schon genauer erklärt.


## Sourcecode

Das Repository mit dem Code und Schaltplänen ist unten verlinkt. Ich freue mich über Kommentare und Verbesserungsvorschläge.

[Projekt Repository]()
[Threeneuron's Pile o Poo](https://threeneurons.wordpress.com/nixie-power-supply/)
[Dalibor Farny](https://www.daliborfarny.com/)
