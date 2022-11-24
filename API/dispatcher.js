

const Status = Object.freeze({
    OK: 0,
    ERROR: 1,
    UNAUTHORIZED: 2
});

export default class Dispatcher {

    send(url,value=null, type, data, success) {
        if (type != 'GET' && data)
            data = JSON.stringify(data);


        fetch(url,{
            method:type,
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Host:'rygest-001-site1.dtempurl.com',
                Authorization: 'Bearer '+value // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3R1ZGVudCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiLQkNCy0LXRgtC40YHRj9C9INCuLtCtLiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2hhc2giOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiItNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiIyIiwidmVyaWZTdHJpbmciOiIiLCJuYmYiOjE2NjEwMzYwODIsImV4cCI6MTY2MTY0MDg4MiwiaXNzIjoiVmVkS2FmIiwiYXVkIjoiTU1JU0xhYiJ9.KmEYkTUK7sdgoLOAtOfE6o6eZHTmh1kh9-vWR0i6Qog
            },
            body:data,
            success:(ans) =>{
                console.log(ans.Status)
                if (ans.Status == Status.Ok)
                    success(ans);
                else{
                    if (ans.status == Status.UNAUTHORIZED)
                        console.log("Not Authorized")
                }
            }
        }).then(res => res.json()).then( ans =>{
            console.log(ans.Status)
            success(ans)
        })
    }  
}

