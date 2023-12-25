### Domains API

---
# Memes
- input = ["dark", "nhanvan", "typical", lord]
- ../meme/{input}
- support language Vietnamese
# OtherAPIs
- QrCode
+ /OtherAPIs/qr?text=${input} (input: text or number)
- lyrics
/OtherAPIs/lyrics?query={input} (error)
# Media
- Pexels:
+ /media/pexels?img={input}