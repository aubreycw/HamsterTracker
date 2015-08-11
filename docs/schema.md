# Schema Information

## TrackingSubject
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
public      | boolean   | default true, 

## TrackingAttribute
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
tracking_subject_id | integer   | not null, foreign key (references tracking subjects)
name                | string    | not null
notes               | text      | 

## DataPoint
column name           | data type | details
----------------------|-----------|-----------------------
id                    | integer   | not null, primary key
tracking_attribute_id | integer   | not null, foreign key (references tracking attributes)
value                 | float     | not null
time                  | datetime  | not null

## TrackingSubjectAccess
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
tracking_subject_id | integer   | not null 
user_id             | integer   | not null
can_write           | boolean   | default false

## User
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

