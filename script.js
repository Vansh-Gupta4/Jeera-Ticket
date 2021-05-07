body{
   margin:0px;
   padding:0px;
   font-family: 'Roboto Slab', serif;

}
*{
   box-sizing: border-box;
   /* border:1px solid red; */
}
.pink{
background-color:lightpink;
}
.blue{
   background-color:lightblue;
}
.green{
   background-color:lightgreen;
}
.black{
   background-color:rgb(33, 31, 31);
}
.toolbar{
   display: flex;     /* dono children same line mai aa gye */
   height: 12vh;
   background-color: rgb(32, 29, 29);
   align-items: center;  /* beech mai le aaya*/
}
.filter_container{
   height: 70%;   /*70% of 12vh*/
   background-color: darkgray;
   width: 20rem;
   border-radius: 3px;
   margin-right: 2rem;
   margin-left: 2rem;
   display: flex;   /* chaaro children same line mai aa gye */
} 
.filter_color-container{
   width: 25%;
   height: 100%;
   background: #444;
   border-right: 1px solid red;
   /* perefectly center */
   display: flex;
   justify-content: center;
   align-items: center;
}
.filter_color{
   height: 40%;
   width:40%;
   border-radius: 2px ;
}
.action_container{
   height: 70%;    /*70% of 12vh*/
   background-color: darkgray;
   width: 8rem;
   border-radius: 3px;
   display: flex;    /*  children same line mai aa gye */
}
.icon_container{
   height: 100%;
   width: 50%;
   border-right: 1px solid red;

   /* Trick to make content at perfectly center */
   display: flex;
   justify-content: center;
   align-items: center;
}
.icon{
   font-size:1.5rem;
}
.main-container{
   min-height: 88vh;
   padding-top: 3rem;
   padding-left: 3rem;
   background-color:aliceblue;
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
}
.ticket_container{
   /* border: 1px solid red; */
   height: 10rem;
   width: 14rem;
   background-color: white;
}
.ticket_color{   /*ticket ke upar color strip ka selector*/
   height: 7%;
}
.ticket_desc_container{
   height: 93%;
   padding: 0.5rem;
   overflow: auto;
   word-break: break-all;
}

.ticket_id{
   margin-bottom: 11px;
   font-weight: 800;
   color:lightslategray;
   
}
.ticket_desc{
   text-align: center;
   font-size: 1.2rem;
}
/* modal container */
.modal_container{
  /* border:solid 1px red; */
  height: 18rem;
  width: 31rem;
  display: flex;  /*kyuki children humme ek ke baad ek chaiye*/
  position: absolute;
  box-shadow: 0 1rem 5rem rgba(0,0,0,0.637);
  display: none; /* "none" karne se dikhega nhi*/
}
.task_container{
   /* border:1px solid green; */
   width: 76%;
   height: 100%;
}
.modal_color-container{
   /* border: 1px solid green; */
   width: 24%;
   height: 100%;
   background-color: #444;
}
.task_box{
   height: 100%;
   width: 100%;
   padding: 2rem;
}
.modal_color-container{
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-evenly;
}
.modal-color{
   height: 12%;
   width: 73%;
   border-radius: 2px;
}
.border{
   border: 5px solid black;
}
