# Installation

You can install the app either via [JCenter](https://bintray.com/bambora-mobile/maven/bn-payment) or by [Source](https://github.com/bambora/BNPayment-Android).

## JCenter

JCenter is the easiest method to install the SDK into your app.

### Step 1: Add Repository

Add this dependency under `dependencies` in the app module's `build.gradle` file:

```groovy
dependencies {
   compile 'com.bambora.bnpayment:bn-payment:1.+'
}
```

### Step 2: Set Permissions

Add the following permission after the `manifest` tag in your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Source

### Step 1: Clone the git repository

Type this command in a terminal window of your choice in the directory that you want to clone the SDK to. You will need to have Git installed on your system.

```shell
git clone https://github.com/bambora/BNPayment-Android
```

### Step 2: Add the code to your project

Place the source code from the cloned repository in your app project. You can then include the Payment module in your app project by adding the following line to `settings.gradle`:

```groovy
include ':bn-payment'
```

### Step 3: Add Dependencies

Add the Payment module as a dependency in your app module by including the following line in the app module's `build.gradle` file:

```groovy
dependencies {
    compile project(':bn-payment')
}
```
