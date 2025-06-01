
Feature: Language Toggle
  As a user
  I want to switch between German and English
  So that I can use the interface in my preferred language

  Scenario: Switch to English
    Given I am on the German login page
    When I click the language toggle button
    Then a user message "Bitte die Seite auf English umstellen" should be sent
    And eventually the form label should change to "Do you have the password?"

  Scenario: Switch back to German
    Given I am on the English login page
    When I click the language toggle button
    Then a user message "Diese Seite bitte auf Deutsch übersetzen" should be sent
    And eventually the form label should change to "Hast du das Passwort?"
