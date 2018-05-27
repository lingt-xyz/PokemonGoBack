<%@ page import="models.User" %><%--
  Created by IntelliJ IDEA.
  User: ling
  Date: 26/05/18
  Time: 7:36 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>PokenmonGoBack</title>
</head>

<body>

    <% User currentUser = (User) (session.getAttribute("currentSessionUser"));%>

    Welcome <%= currentUser.getFirstName() + " " + currentUser.getLastName() %>

</body>

</html>
