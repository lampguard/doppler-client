# Introduction

Doppler is a monitoring platform that provides integrations for you to observe different aspects of a system, in real time. Monitoring like this allows developers to be proactive with issue triaging & resolution, and reduces the need for complete process replication before identifying issues with and in their applications

Events from applications are collected via the `Log` API. A fast, always-up, low-latency API endpoint dedicated solely to collecting logs and stored in our database for you to use.

Any event has the following structure

{% tabs %}

{% tab title="Node (Axios)" %}
```js
axios.post('https://api.dopple.cc/v1/logs', {
  headers: {
    'APP_ID': <%GENERATED APP TOKEN%>
  },
  body: JSON
})
```
{% endtab %}

{% tab title="Laravel" %} 
```php
Http::withHeaders([
    'APP_ID' => <%GENERATED APP TOKEN%>
])->post('https://api.dopple.cc/v1/logs');
```
{% endtab %}

{% tab title="Golang" %} 
```go
```
{% endtab %}

{% endtabs %}