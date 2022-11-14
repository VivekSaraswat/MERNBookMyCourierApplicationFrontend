import './Footer.css';

const Footer = () => {
    return (
        <>
            <div id="footer" >
                <div className="col d-flex justify-content-center">
                    <div id="div-1">
                        <b>Our Centers</b>
                        <ul id="list-1">
                            <li>Chennai</li>
                            <li>Mumbai</li>
                            <li>Delhi</li>
                            <li>Kolkata</li>
                        </ul>
                    </div>
                    <div id="div-2">
                        <b>Our Services</b>
                        <ul id="list-2">
                            <li>A doorstep Service</li>
                            <li>₹500/Courier</li>
                            <li>Add Money to your Wallet</li>
                            <li>Track your Order</li>
                        </ul>

                    </div>
                    <div id="div-4">
                        <b>Our team</b>
                        <ul id="list-4">
                            <li>Anmol Deep</li>
                            <li>Vivek Saraswat</li>
                            <li>Shivlal Jat</li>
                            <li>Mohd Parvez Alam</li>
                        </ul>
                    </div>
                    <div id="div-5">
                        <b> About Us </b>
                        <p id="list-5">In this day and age of technology, offline modes of booking a courier are no more a preference. <br />
                            Online courier booking is easy, fast and hassle-free. <br />
                            Courier Service ticks off all three with our easy app and website navigation.</p>
                        <b>Connect with Us on:</b>
                        <p id="list-5">📧 courierservice@gmail.com<br /> 📞 <a href={`tel:+`} id="ph"> 91-9876543210</a></p>

                    </div>
                </div>
            </div>

            <div className="text-center p-4" style={{ backgroundColor: "azure" }}>
                © 2022 Copyright: CourierService.com
            </div>

        </>
    )
}
export default Footer;