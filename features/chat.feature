
Feature: Chat Support
  As a user
  I want to chat with an agent
  So that I can get help with my login problems

  Scenario: Send message and see loading indicator
    Given the chat section is open
    When I type a message and submit
    Then I should see a loading indicator
    And eventually see an agent response

  Scenario: Handle generic error
    Given the chat section is open
    When the chat API returns an error
    Then I should see a generic error message

  Scenario: Handle rate limit error
    Given the chat section is open
    When the chat API returns a 429 status
    Then I should see "Zu viele Nachrichten. Bitte warten Sie einen Moment."
