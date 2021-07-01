# LED Beleuchtung

## Einführung

Meine Freunde, mein Bruder und ich haben uns zu Hause einen Raum im Keller eingerichtet, wo wir uns treffen und Musik hören können. Ich wollte den Raum mit LED Streifen ausstatten, die Lichteffekte abspielen und sich wahlweise auch mit der Musik syncronisieren.


## Hardware

### LED Streifen

Für die LEDs verwende ich WS2812B RGB LEDs, auch bekannt als Neopixel. Anders als herkömmliche Spannungsgesteuerte LEDs werden diese über einen 24-Bit Farbcode eingestellt. Somit kann man die Farbe jeder einzelnen LED einstellen und zeitgesteuerte Effekte auf dem Streifen abspielen.

Jede LED hat 4 Anschlüsse: 5V, GND, DATA_IN und DATA_OUT. In einem Streifen werden die LEDs kaskadiert, indem man den Datenausgang der vorigen LED mit dem Dateneingang der nächsten verbindet. Ist der Datenpuffer einer LED voll und es werden mehr Daten übertragen, läuft der Puffer in die nächste LED über. Der Streifen verhält sich ähnlich wie ein langes Schieberegister.

![Neopixel Anschlüsse](../img/neopixel_pins.jpg)

Das Senden von Bits geschieht über Taktpulse. Deren Dauer bestimmt ob eine 0 oder 1 gesendet wurde. Sind alle Daten übertragen wird die Datenleitung für eine bestimmte Zeit auf GND gehalten, was für die LEDs heißt, dass die Farbdaten im Puffer angezeigt werden sollen. Die Taktzeigen und Farbcodes können im Datenblatt nachgelesen werden.

![Neopixel Datenblatt](../img/ws2812b_datasheet.pdf)

### Arduino

Für die Steuerung der einzelnen Streifen kommen Arduino Nano 33 IOTs zum Einsatz. Diese haben einen kleinen Formfakter und bringen über den WIFI-NINA Chip eine WLAN und Bluetooth Verbindung mit. Jeder Streifen bekommt eine eigene Steuerung und alle sollen dann untereinander über WLAN vernetzt werden.

### Schaltung

Die Verbindung von den LED Streifen mit den Arduinos ist sehr simpel. Zum Schutz vor zu hohen Strömen wird zwischen Arduino und Dateneingang ein 470Ohm Widerstand gesetzt. Da der Stromverbrauch in den Streifen sehr schnell schwanken kann, ist es ratsam einen relativ großen Kondensator an die Versorgung zu legen.

Die LEDs können bei hoher Helligkeit einen großen Stromverbrauch haben (bis zu 3A bei 5m). Es ist also nicht ratsam die Streifen über den Arduino direkt zu versorgen, weil der Spannungsregler im Arduino nicht für solche Ströme ausgelegt ist. Bei längeren Streifen ist ein externes Netzteil ist nötig.

![Anschlussdiagramm](../img/neopixel_schaltung.png)
![Schaltplan](../img/led_schaltung.png)
![Platine](../img/led_platine.jpg)

### Gehäuse

Für die Platinen habe ich mit Fusion360 ein Gehäuse konstruiert. Das Gehäuse hat einen Deckel mit einem Einrastverschluss und an den Innenwänden befindet sich ein Clip-System, das die Platine festhält.

Mit meinem 3D Drucker (Ender 5) habe ich das Gehäuse in PLA gedruckt. Alle STL-Dateien befinden sich auch im Repository.

![Gehäuse](../img/)


## Software

### PlatformIO

Zur Programmierung des Arduinos verwende ich nicht mehr die traditionelle Arduino IDE sondern ein IDE Plugin namens PlatformIO. Das ist für die erweiterbaren Texteditoren Visual Studio Code und Atom verfügbar und kann als Erweiterung intstalliert werden.

Einstellungen wie das Board und verwendete Bibliotheken werden in der IDE werden per Projekt gesetzt, in der platiformio.ini Konfigurationsdatei.

```toml
; PlatformIO Project Configuration File
;
; Please visit documentation for the other options and examples
; https://docs.platformio.org/page/projectconf.html

[env:nano_33_iot]
platform = atmelsam
board = nano_33_iot
framework = arduino
lib_deps = 
	blynkkk/Blynk@^0.6.7
	adafruit/Adafruit NeoPixel@^1.7.0
	arduino-libraries/WiFiNINA@^1.8.1
```

### Neopixel Bibliothek

Um das Ansteuern der Neopixel mit dem Arduino zu erleichtern, stellt Adafruit die Neopixel Bibliothek bereit. Jedem Streifen am Arduino wird ein C++ Objekt zugeordnet, das alle Daten zur Ansteuerung enthält (Länge, Typ, Farbode, ...).

```C++
#define LED_PIN 1
#define LED_COUNT 240

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
// NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
// NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
// NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
// NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
// NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
```

Um die Farben der LEDs einzustellen ruft man die Methode *setPixelColor()* des Streifen auf, den man bearbeiten will. *n* ist der Index der LED (*n* = 0 für die erste, *n* = 1 für die zweite, ...). *red*, *green* und *blue* sind die Farbwerte und gehen von 0 bis 255. Wenn alle Farben eingestellt sind kann man mit *show()* alles anzeigen lassen. *numPixels()* gibt mir die Anzahl der LEDs im Streifen zurück.

Wenn ich z.B den halben Streifen Rot färben will, gehe ich wie folgt vor:

```C++
// strip.setPixelColor(n, red, green, blue);

for (int i = 0; i < strip.numPixels() / 2; i++) {
  strip.setPixelColor(i, 255, 0, 0);
}
strip.show();
```

So lassen sich auch komplexere Effekte programmieren. Zum Beispiel möchte ich jetzt, dass sich der Streifen langsam mit Rot füllt und dann wieder zurückwandert:

```C++
for (int i = 0; i < strip.numPixels(); i++) {
  strip.setPixelColor(i, 255, 0, 0);
  strip.show();
  delay(50);
}

for (int i = strip.numPixels(); i > 0; i--) {
  strip.setPixelColor(i, 0, 0, 0);
  strip.show();
  delay(50);
}
```

### Blynk Bibliothek

#### Arduino Code

Die Blynk Bibliothek ermöglicht es, dass die einzelnen Streifen untereinander kommunizieren und dass ich die Farben und Effekte mit meinem Handy einstellen kann. Die Arduinos kommunizieren über "virtuelle pins", diese können alle möglichen Datentypen zwischen den Geräten transportieren. Das funktioniert in der Form eines "Publish-Subscribe-Modells".

Um den Datentransfer zu ermöglichen, wird jeder Arduino in der App registriert und erhält einen Athentication-Token. Dieser wird zusammen mit den WLAN-Daten in den Arduino eingetragen:

```C++
char auth[] = "irgendeintoken";
char ssid[] = "wlanname";
char pass[] = "wlanpasswort";

void setup() {
  Blynk.begin(auth, ssid, pass);
  while(Blynk.connected() == false);
}

void loop() {
  Blynk.run();    // Hält die Verbindung aufrecht, sollte regelmäßig aufgerufen werden
}
```

Ein Gerät kann darauf achten ob auf einem virtuellen pin Daten gesendet werden. Ist das der Fall, wird eine Callback-Funktion ausgeführt, die irgendwie auf die Daten reagiert. Dementsprechend kann jedes Gerät irgendwelche Daten auf einem virtuellen pin senden, unabhängig davon ob andere Geräte zuhöhren oder nicht:

```C++
// Sende daten zur App über virtuelle pins
Blynk.virtualWrite(V1, true);
Blynk.virtualWrite(V2, 123);
Blynk.virtualWrite(V3, "abc");

BLYNK_WRITE(V0) {
  // code wird ausgeführt wenn sich der wert des virtuellen pins V0 ändert
}

BLYNK_READ(V4) {
  // arduino wird von der app angefragt, interne daten über V4 zur app zu senden
}
```

Jeder Arduino kann auf einem virtuellen pin eine Callback-Funktion haben. Der Unterschied besteht darin, wenn der Arduino Daten zur App oder zu anderen Arduinos senden will. Wenn Daten werden mit der Methode *Blynk.virtualWrite()* zur App gesendet. Wenn Daten zu einem bestimmten Arduino sollen, muss man den Arduino mit seinem eigenen Authentication-Token anzielen:

```C++
char auth_other_arduino[] = "3oth90ga4o3gp09aqw8h43t0ngpw";
WidgetBridge bridge(V5);

void setup() {
  // Andere initialisierungen...
  bridge.setAuthToken(auth_other_arduino);
  bridge.digitalWrite(2, HIGH); // Digitale Pins des anderen Arduinos steuern
  bridge.virtualWrite(V4, "test");
}
```

#### App

In der App kann man mit Widgets ein Controll-Dashboard erstellen. Man hat die Auswahl zwischen Buttons, Slider, Anzeigen, Terminals, usw. Jedes Widget hat ein kleines Tutorial, das erklärt, wie die Widgets konfiguriert werden und wie man den Code im Arduino aufsetzen muss. Hier ist das kleine Dashboard, das ich für die LED Streifen erstellt habe.

![App](../img/blynk_app.png)


## Sourcecode

Alle Quelldateien liegen in meinem Repository. Ich habe die Dokumentation für die Neopixel- und Blynkbibliothek unten verlinkt. Ich freue mich immer über Kommentare und Verbesserungsvorschläge.

[Projekt Repository](https://github.com/SebastianBraun01/LED_Streifen)
[Blynk Bibliothek](https://blynk.io/)
[Adafruit Neopixel Bibliothek](https://learn.adafruit.com/adafruit-neopixel-uberguide/arduino-library-use)
