import PageHeader from "./common/pageHeader";

const About = () => {
   return (
      <>
         <PageHeader title={"About"} />

         <div className="row mt-2">
            <div className="col-12 text-center">
               Welcome to BizCard! <br /> Our platform is designed to empower
               our community to effortlessly create and share their digital
               visit cards. <br />
               With three distinct plans as explained at the bottom, you will
               have the flexibility to choose what aligns best with your needs.{" "}
               <br />
               Join us today and become a valued member of our thriving
               community!
            </div>
         </div>

         <div>
            <h2 className="display-6 text-center my-4">Plans</h2>

            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center mt-3 g-3">
               <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm h-100">
                     <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">No account</h4>
                     </div>
                     <div className="card-body vstack">
                        <ul className="list-unstyled my-auto">
                           <li>Access all the cards</li>
                           <li>Contact support</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm h-100">
                     <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">Standard</h4>
                     </div>
                     <div className="card-body vstack">
                        <ul className="list-unstyled my-auto">
                           <li>Access all the cards</li>
                           <li>Keep Favorites</li>
                           <li>Contact support</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm h-100 border-primary">
                     <div className="card-header py-3 text-bg-primary border-primary">
                        <h4 className="my-0 fw-normal">Business</h4>
                     </div>
                     <div className="card-body vstack">
                        <ul className="list-unstyled my-auto">
                           <li>Access all the cards</li>
                           <li>Keep Favorites</li>
                           <li>Create your own card</li>
                           <li>Manage your cards</li>
                           <li>Contact support</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <h2 className="display-6 text-center mb-4">Compare plans</h2>

            <div className="table-responsive">
               <table className="table text-center">
                  <thead>
                     <tr>
                        <th style={{ width: "34%" }}></th>
                        <th style={{ width: "22%" }}>Free</th>
                        <th style={{ width: "22%" }}>Pro</th>
                        <th style={{ width: "22%" }}>Enterprise</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th scope="row" className="text-start">
                           Access all the cards
                        </th>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                     </tr>
                     <tr>
                        <th scope="row" className="text-start">
                           Keep Favorites
                        </th>
                        <td></td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                     </tr>
                  </tbody>

                  <tbody>
                     <tr>
                        <th scope="row" className="text-start">
                           Create your own card
                        </th>
                        <td></td>
                        <td></td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                     </tr>
                     <tr>
                        <th scope="row" className="text-start">
                           Manage your cards
                        </th>
                        <td></td>
                        <td></td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                     </tr>
                     <tr>
                        <th scope="row" className="text-start">
                           Contact support
                        </th>
                        <td>
                           {" "}
                           <i className="bi bi-check2"></i>
                        </td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                        <td>
                           <i className="bi bi-check2"></i>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
};

export default About;
