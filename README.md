# Dokumentacja projektu na zaliczenie zajęć Programowanie aplikacji internetowych Lato 2024

## Temat projektu

Tematem projektu jest aplikacja internetowa pozwalająca na ocenianie różnych ras psów.

## Opis projektu

Aplikacja pozwala na ocenę różnych ras psów oraz porównanie najczęściej wybieranych ras na podstawie otrzymanych liczby głosów.

Najlepsze 5 ras pojawia się w rankingu wraz z ilością otrzymanych głosów. 
Ranking wyświetlany jest również w formie wykresu słupkowego.

## Wymagania

Po otwarciu strony, aplikacja powinna pobrać 3 losowe rasy psów tj. nazwa rasy wraz ze zdjęciem i wyświetlić je użytkownikowi.
Użytkownik powinien mieć możliwość wybrania jednej rasy. Po każdym wybraniu rasy komponent wyswietlający psy powinnien się dynamicznie (bez innej interakcji użytkownika) odświeżyć wyświetlając kolejne rasy psów.
Każdy głos oddany przez użytkownika powinien zostać wysłany do "backendu" skąd powinien zostać zapisany w bazie danych.
Pod adresem `/leadearboad` powinien być dostępny ranking psów generowany na podstawie wykonanych głosów. Ranking powinien zawierać zdjęcie rasy wraz z ilością oddanych głosów. Przycisk `Pokaż wykres` powinien generować wykres słupkowy przedstawiający rozkład oddanych głosów na 5 najczęściej wybieranych ras. Przycisk powinien pozwolic na wrócenie do rankingu w formie zdjęcie-liczba głosów.

## Odbiorcy

Odbiorcami aplikacji są miłośnicy psów.

## 


## Użyte technologie i API

### Frontend:
 - React
 - CSS
 - HTML
 - Axios (do zapytan dla zewnetrznego API)
 - [Dog API](https://dog.ceo/dog-api/) (do pobierania zdjec i nazwy ras psów)

### Backend:
 - NextJS
 - Supabase (Postgres SaaS jako baza danych)

## Użycie
