import { Route, Routes } from "react-router-dom";

import SignIn from "./Components/SignIn/SignIn";
import Navbar from "./Components/Navbar/Navbar"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useState } from "react";
import PublishContent from "./Components/Dashboard/PublishContent/PublishContent";
import AllContents from "./Components/Contents/AllContents";
import ContentDetail from "./Components/Contents/ContentDetail";
import ContentList from "./Components/Dashboard/ContentList/ContentList";
import EditPost from "./Components/Dashboard/ContentList/EditPost";

const queryClient = new QueryClient()
function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
          <Route path='/' element={<AllContents></AllContents>}></Route>
          <Route path='/admin/publish-content' element={<PublishContent></PublishContent>}></Route>
          <Route path='/admin/content-list' element={<ContentList></ContentList>}></Route>
          <Route path='/content-detail/:id' element={<ContentDetail></ContentDetail>}></Route>
          <Route path='/admin/edit-content/:id' element={<EditPost></EditPost>}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
