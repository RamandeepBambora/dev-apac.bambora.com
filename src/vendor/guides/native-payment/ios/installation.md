# Installation

Currently, Xcode 8.2.1 is being used. 

### Step 1: Obtain frameworks 

Bambora will provide you with the following frameworks in the SDK code: BNPayment.framework and BNCardCaptureSDK.framework. 

### Step 2: Create a frameworks group 

In your project create a ‘frameworks’ group if it doesn’t exist already. 

### Step 3: Link Frameworke

In the Finder window, drag and drop the two frameworks above to group ‘Frameworks’.  Check box ‘Copy items if needed’.  The two frameworks above should be added to the ‘Linked Frameworks and Libraries’. 

### Step 4: Add Frameworks

Add BNPayment.framework and BNCardCaptureSDK.framework to Target -> General -> Embedded Libraries 

### Step 5: Build

Build and run the project in Xcode.
