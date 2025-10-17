import qrcode

# Android App URL
android_url = "https://www.rustore.ru/catalog/app/fm.bolid.android"
android_img = qrcode.make(android_url)
android_img.save("qr-android.png")

# iOS App URL
ios_url = "https://apps.apple.com/app/id123456789"
ios_img = qrcode.make(ios_url)
ios_img.save("qr-ios.png") 