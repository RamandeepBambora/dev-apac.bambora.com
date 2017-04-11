# Registering Cards

Credit card registration is done through the registration form. This registration form is displayed if the user hasn't yet registered a card. The credit card details are automatically encrypted before being sent to our servers, this is all handled for you. For registering the cards you have the option of:

* Using the default form
* Creating a customized form
* Using a hosted web-based form

## Display the default native form

This example shows you how to present the default credit card registration form using an activity.

### Create a layout

Start by creating a layout file with the name name `activity_native_card_registration`, or choose your own file name. The example shows what the layout file needs to contain. Here we add a `CardRegistrationFormLayout`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.bambora.nativepayment.widget.CardRegistrationFormLayout
      android:id="@+id/registration_form"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>
```

### Create an activity
Next, create an activity and name it `NativeCardRegistrationActivity`.

To receive callbacks when registration is completed we need to add a listener to the layout. To do this we have the activity implement `ICardRegistrationCallback` and extend the `onCreate` method to set a registration result listener.

Then, in the same `onCreate` method, set the your newly created layout file (`activity_native_card_registration`) as the contentView for the activity, as the code example shows.

```java
public class NativeCardRegistrationActivity extends AppCompatActivity implements ICardRegistrationCallback {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_card_registration);
        CardRegistrationFormLayout registrationForm = (CardRegistrationFormLayout) findViewById(R.id.registration_form);
        registrationForm.setRegistrationResultListener(this);
    }

    @Override
    public void onRegistrationSuccess(CreditCard creditCard) {
        // Card registration completed successfully
    }

    @Override
    public void onRegistrationError(RequestError error) {
        // Card registration failed
    }
}

```

### Display the form activity

All that's left to show the native credit card registration form is to start the activity. The code example shows how to do it.

```java
Intent intent = new Intent(this, NativeCardRegistrationActivity.class);
startActivity(intent);
```
