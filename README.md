# TODO


### Request & Response Logic Flow
```text
Incoming Request
-> Guards (CORS, Auth related, Rate-limiting (if required))
-> Interceptors (Logger)
-> Pipes (Validation, Transformation, Sanitization)
-> Controller
-> Service
-> Interceptors (Logger)
-> Filter (Error Handler)
-> Outgoing Response
```

