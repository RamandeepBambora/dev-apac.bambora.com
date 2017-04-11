# Installation

To install the iOS Native Payment SDK, we recommend using either CocoaPods or Carthage.

## CocoaPods

CocoaPods is a dependency manager for third-party libraries.

We recommend following [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started) for installing CocoaPods.

### Step 1: Create Project

Create or select an Xcode project. Then open a terminal window and `cd` into the project directory.

### Step 2: Create Podfile

Create a Podfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:

```shell
pod init
```

### Step 3: Modify Podfile

Add this information to the Podfile:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '8.0'

pod "BNPayment"
```

### Step 4: Install Pod

Install the pod by running this command in the OS X Terminal from the same folder as the Podfile:

```shell
pod install
```

### Step 5: Load project

Re-open the project through the newly created `.xcworkspace` file.

## Carthage

Carthage is a is a dependency manager for third-party libraries. It is an alternative to using CocoaPods.

We recommend following [these instructions](https://github.com/Carthage/Carthage#installing-carthage) for installing Carthage.

### Step 1: Create Project

Create or select an Xcode project. Then open a terminal window and `cd` into the project directory

### Step 2: Create Cartfile

Create a Cartfile by running the following command in the OS X Terminal from the folder where your Xcode project file (`.xcodeproj`) is:

```shell
touch Cartfile
```

### Step 3: Edit Cartfile

Open the newly created Cartfile in the text editor of your choice, and enter the following text:

```shell
github "bambora/BNPayment-iOS"
```

### Step 4: Update Project

Run the following command in the OS X Terminal.

```shell
carthage update
```

This will create a file called `BNPayment.framework` that you can find by going to `Carthage/Build/iOS`.

### Step 5: Link Framework

Add `BNPayment.framework` to `Target -> General -> Linked Frameworks and Libraries` in Xcode.

### Step 6: Add Run Script

Go to `Target -> Build Phase` in Xcode. Add a `New Run Script Phase` and then enter the following script line:

```shell
/usr/local/bin/carthage copy-frameworks
```

### Step 7: Configure

Add the `BNPayment.framework` line under `Input Files`:

```
$(SRCROOT)/Carthage/Build/iOS/BNPayment.framework
```

### Step 8: Build

Build and run the project in Xcode.
