#!/usr/bin/env python3
"""Generate AI Tools Daily Report PDF - Fixed for Unicode"""

from fpdf import FPDF
from datetime import datetime
import os

class AIPDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 18)
        self.cell(0, 10, 'AI Tools Daily Report', new_x='LMARGIN', new_y='NEXT', align='C')
        self.set_font('Helvetica', '', 12)
        self.cell(0, 10, f'Date: {datetime.now().strftime("%Y-%m-%d")}', new_x='LMARGIN', new_y='NEXT', align='C')
        self.ln(10)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')
    
    def add_category(self, title):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(30, 50, 100)
        self.cell(0, 10, title, new_x='LMARGIN', new_y='NEXT')
        self.ln(2)
        self.set_text_color(0, 0, 0)
    
    def add_tool(self, name, description, link, price='N/A'):
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(0, 0, 0)
        self.cell(0, 8, f'- {name}', new_x='LMARGIN', new_y='NEXT')
        self.set_font('Helvetica', '', 10)
        desc = description[:200] + ('...' if len(description) > 200 else '')
        self.multi_cell(0, 6, f'  {desc}')
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(0, 100, 200)
        self.cell(0, 6, f'  {link}', new_x='LMARGIN', new_y='NEXT')
        self.set_font('Helvetica', '', 10)
        if price and price != 'N/A':
            self.set_text_color(50, 150, 50)
            self.cell(0, 6, f'  Pricing: {price}', new_x='LMARGIN', new_y='NEXT')
        else:
            self.set_text_color(100, 100, 100)
            self.cell(0, 6, f'  Pricing: Free to start', new_x='LMARGIN', new_y='NEXT')
        self.set_text_color(0, 0, 0)
        self.ln(5)
    
    def add_news(self, title, source, summary, url):
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 6, f'- {title}')
        self.set_font('Helvetica', '', 9)
        self.set_text_color(80, 80, 80)
        self.multi_cell(0, 5, f'  Source: {source}')
        summary = summary[:150] + ('...' if len(summary) > 150 else '')
        self.multi_cell(0, 5, f'  {summary}')
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(0, 100, 200)
        self.cell(0, 6, f'  {url[:80]}...', new_x='LMARGIN', new_y='NEXT')
        self.set_text_color(0, 0, 0)
        self.ln(3)

def generate_report():
    pdf = AIPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Title page
    pdf.add_page()
    pdf.set_font('Helvetica', '', 12)
    pdf.ln(20)
    pdf.set_font('Helvetica', 'B', 16)
    pdf.cell(0, 10, 'TOP 3 PICKS OF THE DAY', new_x='LMARGIN', new_y='NEXT', align='C')
    pdf.ln(10)
    
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(30, 50, 100)
    pdf.cell(0, 10, '1. FLUX 3 Video by Black Forest Labs', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 6, '  Frontier multimodal video generation model that creates up to 20-second HD clips with native audio. Supports text-to-video, image-to-video, keyframes, and lip-synced dialogue in 14+ languages.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://bfl.ai/blog/flux-3-video', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(8)
    
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(30, 50, 100)
    pdf.cell(0, 10, '2. Claude Code Auto Mode Default', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 6, '  Anthropic makes auto mode default for Pro/Max/Team plans starting Aug 14. Auto mode uses AI classifiers to block 89% of dangerous commands vs 13.6% caught by humans.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://claude.com/blog/auto-mode-default-in-claude-code', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(8)
    
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(30, 50, 100)
    pdf.cell(0, 10, '3. Kitesurf Browser by Cloudflare', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 6, '  Agent-first browser built on Cloudflare Workers for AI automation. Runs in V8 isolates using Rust/WASM for efficient agentic tasks like screenshots and HTML extraction.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://blog.cloudflare.com/kitesurf/', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(15)
    
    # AI Tools by Category
    pdf.add_page()
    pdf.add_category('LLM & ChatGPT Alternatives')
    pdf.add_tool('GPT-5.6 Sol', 'Updated ChatGPT model for Plus/Pro users with 68% fewer factual errors and reasoning slider control.', 'https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/', 'Free + Pro: $20/mo')
    pdf.add_tool('GPT-5.6 Luna', 'New default model for free users with unlimited text chats and Think button for complex questions.', 'https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/', 'Free')
    pdf.add_tool('Claude Fable 5', 'Anthropic updated model with 85% reduction in biology fallbacks via improved safety classifiers.', 'https://anthropic.com/news/improving-fable-5-s-biology-safeguards', 'Usage-based')
    
    pdf.add_category('AI Coding Assistants')
    pdf.add_tool('Claude Code', 'Auto mode now default for Pro/Max/Team. Supports self-hosted environments for Teams/Enterprise.', 'https://claude.com/blog/run-claude-code-sessions-on-your-own-compute', 'Usage-based')
    pdf.add_tool('Muse Code Beta', 'Meta terminal coding agent powered by Muse Spark 1.2, handles full software engineering tasks.', 'https://x.com/finkd/status/2085080750034940201', 'Beta')
    pdf.add_tool('Computer for Builders', 'Perplexity platform orchestrating 15+ AI models for coding, deployment & growth.', 'https://www.perplexity.ai/hub/blog/computer-for-builders', 'Pro/Max: $20-40/mo')
    
    pdf.add_category('AI Image & Video Generators')
    pdf.add_tool('FLUX 3 Video', 'Black Forest Labs frontier video model with 20-second 1080p clips, native audio, 14+ language lip-sync.', 'https://bfl.ai/blog/flux-3-video', 'API: Pay-per-use')
    pdf.add_tool('Wan3.0', 'Alibaba video generation model with 30-second outputs and multimodal inputs (text, images, PDFs, PPT).', 'https://www.alibabacloud.com/blog/alibaba-unveils-wan3-0-with-twice-as-long-video-outputs', 'Cloud: Pay-as-you-go')
    pdf.add_tool('Muse Spark 1.2', 'Meta updated model capable of complete software engineering tasks across large repos.', 'https://x.com/finkd/status/2085080750034940201', 'API: Pay-per-use')
    
    pdf.add_category('AI Voice & Audio')
    pdf.add_tool('Dubbing v2 API', 'ElevenLabs improved dubbing with emotion preservation across 90+ languages.', 'https://elevenlabs.io/blog/dubbing-api', 'API: Pay-per-use')
    pdf.add_tool('AI Music Principles', 'Suno transparency tools including audio watermarking and new downloads policy.', 'https://suno.com/blog/building-the-future-of-music-responsibly', 'Free tier + paid')
    
    pdf.add_category('AI Productivity')
    pdf.add_tool('Ask Maps Expanded', 'Google AI Maps now includes food ordering, real-time transit & Personal Intelligence.', 'https://blog.google/products-and-platforms/products/maps/order-food-in-ask-maps', 'Free')
    pdf.add_tool('ChatGPT Edu Plugins', 'OpenAI education plugins for K-12 and college users with course integration.', 'https://openai.com/index/learn-teach-chatgpt-work-codex', 'Education pricing available')
    
    pdf.add_category('Open Source Releases')
    pdf.add_tool('Alpamayo 2 Super', 'NVIDIA frontier open reasoning model for robotaxis, 23.2 points ahead of GPT-4o on LingoQA.', 'https://blogs.nvidia.com/blog/alpamayo-2-super-open-model-now-available/', 'Open source')
    pdf.add_tool('WeatherNext 2', 'DeepMind open-sourced cyclone forecasting model with 25% better track prediction.', 'https://deepmind.google/blog/weathernext-ai-model-achieves-breakthrough-in-forecasting-cyclones/', 'Open source')
    
    # AI Industry News
    pdf.add_page()
    pdf.add_category('AI Industry News')
    
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 50, 100)
    pdf.cell(0, 15, 'KEY INDUSTRY NEWS', new_x='LMARGIN', new_y='NEXT', align='C')
    pdf.ln(5)
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 10, '- OpenAI Astra Model Security Issues', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.multi_cell(0, 6, '  OpenAI paused Astra activities that don\'t meet new security controls due to potential zero-day exploit capabilities.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(5)
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 10, '- DeepMind Leadership Change', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.multi_cell(0, 6, '  Demis Hassabis steps down as CEO to become Chair & Chief Scientist. Koray Kavukcuoglu takes over as SVP.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://www.theverge.com/tech/975677/google-deepmind-ai-demis-hassabis-shakeup', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(5)
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 10, '- Meta Muse Spark 1.1 Cybersecurity Incident', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.multi_cell(0, 6, '  AI model hacked during security testing due to sandbox misconfiguration. Prompting calls for stronger safety protocols.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://www.theinformation.com/articles/meta-ai-model-hacked-another-company-cybersecurity-testing', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(5)
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 10, '- Jeff Dean & Google Founders Launch Discovery Loop', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.multi_cell(0, 6, '  Former Google executives launch PBC to automate ML research with ambitions on NAE Grand Challenge problems.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://x.com/JeffDean/status/2085034604172603724', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(5)
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 10, '- White House AI Framework Secret', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 10)
    pdf.multi_cell(0, 6, '  Administration keeping AI evaluation framework secret from public and allies, only sharing with selected companies.')
    pdf.set_font('Helvetica', 'I', 9)
    pdf.set_text_color(0, 100, 200)
    pdf.cell(0, 6, '  https://www.axios.com/2026/08/04/white-house-ai-framework-under-wraps', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(10)
    
    # Save PDF
    output_dir = r'C:\Users\A\ai-tools-reports'
    os.makedirs(output_dir, exist_ok=True)
    filename = f'ai-tools-report-{datetime.now().strftime("%Y-%m-%d")}.pdf'
    filepath = os.path.join(output_dir, filename)
    pdf.output(filepath)
    print(f'Report saved to: {filepath}')
    return filepath

if __name__ == '__main__':
    generate_report()