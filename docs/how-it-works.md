# How

Doppler provides an always-up, low latency API endpoint which collects <u>events</u> from your application. Different services then collate and aggregate the data and our dashboard provides an intuitive display for the data.

# Events

Events from applications are collected via the `Log` API. A fast, always-up, low-latency API endpoint dedicated solely to collecting logs and stored in our database for you to use.

Any event has the following structure

{% tabs %}

{% tab title="Node (Fetch)" %}
```js
fetch('https://api.dopple.cc/v1/logs', evt, {
  method: 'POST',
  headers: {
    'APP_ID': <%GENERATED APP TOKEN%>
  }
})
```
{% endtab %}

{% tab title="Laravel" %} 
```php
Http::withHeaders([
    'APP_ID' => <%GENERATED APP TOKEN%>
])->post('https://api.dopple.cc/v1/logs', $evt);
```
{% endtab %}

{% tab title="Golang" %} 
```go
```
{% endtab %}

{% endtabs %}

# Applications

Applications serve the basic function of identifying events from one application to another as Doppler supports monitoring of multiple applications. In fact, you can monitor as many applications as you need!

To get started, create [Doppler](https://usedoppler.com/signup)  account, navigate to the <b>Add New App</b> section and give your app a name. That's it! Copy your app token and start collecting events.