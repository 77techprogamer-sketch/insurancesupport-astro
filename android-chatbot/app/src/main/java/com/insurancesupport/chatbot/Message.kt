
package com.insurancesupport.chatbot

data class Message(val sender: Sender, val text: String)

enum class Sender { USER, BOT }
