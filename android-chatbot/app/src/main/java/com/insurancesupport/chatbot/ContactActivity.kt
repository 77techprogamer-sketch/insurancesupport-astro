
package com.insurancesupport.chatbot

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class ContactActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Direct launch intents based on extras
        val action = intent?.getStringExtra("action")
        when (action) {
            "whatsapp" -> startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(getString(R.string.whatsapp_url))))
            "call" -> startActivity(Intent(Intent.ACTION_DIAL, Uri.parse(getString(R.string.call_number))))
        }
        finish()
    }
}
