import reactLogo from '../assets/react.svg'

export default function Profile({userProfile}) {
    return (
        <div className="profile-container" style={{
            display: "flex", flexDirection: "column", height: 300, position: "relative", aspectRatio: 1
        }}>
            <div className="bg-container" style={{
                flex: "1 0 30%", backgroundColor: "white"
            }}></div>

            <div style={{
                position: "absolute", top: "20%", left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <div style={{
                    backgroundColor: "whitesmoke", borderRadius: "50%"
                }}>
                    <img src={reactLogo} className="profile-img" alt="" style={{
                        height: 70, aspectRatio: 1
                    }}/>
                </div>
            </div>

            <div className="profile-info-container" style={{
                flex: "1 0 70%", paddingTop: 50, display: "flex", flexDirection: "column", gap: 30, backgroundColor: "Highlight"
            }}>

                <div className="personl-info" style={{
                    display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid black", paddingBottom: 40
                }}>
                    <div className="name">{userProfile.fullName}</div>
                    <div className="city">{userProfile.city}</div>
                </div>

                <div className="social-media" style={{
                    display: "flex", justifyContent: "space-between"
                }}>
                    {userProfile.socialLife.map((social,index) => <SocialMedia key={index} count={social.count} title={social.title}/>)}
                </div>

            </div>

        </div>
    )
}

function SocialMedia({ count, title }) {

    return (
        <div className="container">
            <div style={{
                fontWeight: 500, fontSize: 25, color: "black"
            }}>{count}</div>
            <div>{title}</div>
        </div>
    )
}