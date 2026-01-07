# 📱 Como Gerar e Instalar o APK

## Método 1: Build Local (Em andamento)

### Gerar APK:
```bash
npx expo run:android --variant debug
```

### Localização do APK:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Instalar no emulador/dispositivo:
```bash
# Com dispositivo conectado ou emulador aberto
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Ou arrastar e soltar o APK no emulador
```

## Método 2: EAS Build (Build na nuvem)

### 1. Login no Expo:
```bash
eas login
```

### 2. Configurar projeto:
```bash
eas build:configure
```

### 3. Gerar APK preview:
```bash
eas build --platform android --profile preview
```

### 4. Download:
Após o build, você receberá um link para download do APK.

## Método 3: APK de Produção

### Gerar APK de produção:
```bash
npx expo run:android --variant release
```

Ou com EAS:
```bash
eas build --platform android --profile production
```

## 🎮 Testando no Emulador

### Abrir emulador:
```bash
# Listar emuladores disponíveis
emulator -list-avds

# Abrir emulador específico
emulator -avd <nome_do_emulador>
```

### Com Expo Go (alternativa rápida):
```bash
npx expo start
# Pressione 'a' para abrir no Android
```

## 📦 Builds Diferentes

- **debug**: Desenvolvimento, logs habilitados
- **preview**: Teste interno, otimizado
- **release**: Produção, assinado e otimizado

## ⏱️ Tempo Estimado

- **Primeira build**: 10-15 minutos
- **Builds subsequentes**: 2-5 minutos
- **EAS Build**: 15-20 minutos (na nuvem)

## 🔍 Verificar Status do Build

```bash
# Ver logs detalhados
npx expo run:android --variant debug --no-build-cache

# Limpar cache se necessário
cd android
./gradlew clean
cd ..
```

## 🐛 Troubleshooting

### Erro de assinatura:
```bash
cd android
./gradlew clean
cd ..
npx expo prebuild --clean
npx expo run:android
```

### Porta ocupada:
```bash
npx expo start --clear
```

### Dependências Android:
Certifique-se que tem instalado:
- Android Studio
- Android SDK
- Java JDK 17+
- Variáveis de ambiente: ANDROID_HOME, JAVA_HOME
