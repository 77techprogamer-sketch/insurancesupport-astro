
package com.insurancesupport.chatbot

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: MessageAdapter
    private val messages = mutableListOf<Message>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerView = findViewById(R.id.recyclerView)
        adapter = MessageAdapter(messages)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter
        // Initialize with welcome
        addMessage(Message(sender = Sender.BOT, text = getString(R.string.welcome_message)))
    }

    fun addMessage(message: Message) {
        messages.add(message)
        runOnUiThread { adapter.notifyItemInserted(messages.size - 1) }
    }
}
