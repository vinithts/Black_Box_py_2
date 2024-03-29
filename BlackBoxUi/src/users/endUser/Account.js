import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { account_menu_font, profile_menu } from '../../controller/fontSize'
import { primary_colors } from '../../controller/colors'
import { MdModeEditOutline } from 'react-icons/md';

const subtext = {
    fontSize: account_menu_font.menuItems,
    color: primary_colors.gray,
}

const subtextvalues = {
    fontSize: account_menu_font.menuItems,
    color: primary_colors.white,
}

const Account = () => {

    const SubTextContent = ({ label, value }) => {
        return (
            <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={12}
                xs={12}
            >
                <Typography sx={subtext}>{label}</Typography>
                <Typography sx={subtextvalues}>{value}</Typography>
            </Grid>
        )
    }

    return (
        <Stack >
            <Box sx={{
                height: 120,
                width: '100vw',
                mt: 5,
                position: 'relative',
                backgroundImage: `url(https://img.freepik.com/premium-photo/3d-render-abstract-modern-background-with-folded-ribbon-blue-cloth-macro-fashion-wallpaper-with-textile-layers-wave-shape-paper-roll-edges-white-backdrop-curvy-sheets-minimal-composition_645257-400.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <img
                    alt="profile"
                    height={150}
                    width={150}
                    style={{
                        borderRadius: '50%',
                        position: 'absolute',
                        zIndex: 99,
                        bottom: -70,
                        left: 50,
                        objectFit: 'cover',
                        border: `2px solid white`
                    }}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" />
            </Box>

            <Box sx={{ pt: 13, bgcolor: primary_colors.black }} />

            <Grid container spacing={1} sx={{ bgcolor: primary_colors.black }}>
                <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Box sx={{ px: 4 }}>
                        <Stack display={'flex'} flexDirection={'row'}   >
                            <Typography sx={{ fontSize: profile_menu.title, color: primary_colors.white, fontWeight: 'bold' }}>Personal Information</Typography>
                            <Box
                                className='cursor'
                                display={'flex'}
                                alignItems={'center'}
                                sx={{
                                    borderRadius: 10,
                                    border: `1px solid ${primary_colors.gray}`,
                                    px: 1,
                                    mx: 2
                                }}>
                                <Typography sx={subtext}>
                                    Edit
                                </Typography>
                                &nbsp;
                                <MdModeEditOutline color={primary_colors.gray} />
                            </Box>
                        </Stack>
                        <Box m={2} />
                        <Grid container spacing={1}>
                            <SubTextContent label={'First Name'} value={'Sabesan'} />
                            <SubTextContent label={'Last Name'} value={'Sabesan'} />
                            <SubTextContent label={'Date of Birth'} value={'23.08.2023'} />
                            <SubTextContent label={'Phone Number'} value={'+91 9047832480'} />
                            <SubTextContent label={'State'} value={'Tamil Nadu'} />
                            <SubTextContent label={'Country'} value={'India'} />

                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <Typography sx={subtext}>Address</Typography>
                                <Typography sx={subtextvalues}> 11, 198, Mambakkam - Medavakkam Main Rd, near Mugavari Eye Hospital, Munusamy Nagar</Typography>
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Typography sx={subtext}>Profile Description</Typography>
                                <Typography sx={subtextvalues}>"Software development company helping businesses transform through technology. We develop software product , mobile application and custom application for businesses or consumers. Unleash the power of SALESFORCE through our ON DEMAND services"</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <Box sx={{ px: 4 }}>
                        <Stack display={'flex'} flexDirection={'row'}   >
                            <Typography sx={{ fontSize: profile_menu.title, color: primary_colors.white, fontWeight: 'bold' }}>
                                Information for Invoices
                            </Typography>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                className='cursor'
                                sx={{
                                    borderRadius: 10,
                                    border: `1px solid ${primary_colors.gray}`,
                                    px: 1,
                                    mx: 2
                                }}>
                                <Typography sx={{ fontSize: account_menu_font.menuItems, color: primary_colors.gray }}>
                                    Edit
                                </Typography>&nbsp;
                                <MdModeEditOutline color={primary_colors.gray} />
                            </Box>
                        </Stack>
                        <Box m={2} />
                        <Grid container>
                            <SubTextContent label={'GST No.'} value={'22IHJD37189HD'} />
                            <SubTextContent label={'PAN No.'} value={'23JDNJ38392JS'} />

                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={0}
                                xs={0}
                            />
                            <Stack display={'flex'} flexDirection={'row'} mt={2}  >
                                <Typography sx={{ fontSize: profile_menu.title, color: primary_colors.white, fontWeight: 'bold' }}> Social Network</Typography>
                                <Box display={'flex'} alignItems={'center'} className='cursor' sx={{ borderRadius: 10, border: `1px solid ${primary_colors.gray}`, px: 1, mx: 2 }}>
                                    <Typography sx={subtext}>Edit</Typography>&nbsp;<MdModeEditOutline color={primary_colors.gray} />
                                </Box>
                            </Stack>
                        </Grid>
                        <Box m={2} />
                        <Grid container spacing={1}>
                            <SubTextContent label={'Twitter'} value={'---'} />
                            <SubTextContent label={'Facebook'} value={'---'} />
                            <SubTextContent label={'Linked In'} value={'---'} />
                            <SubTextContent label={'Telegram'} value={'---'} />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

        </Stack>
    )
}

export default Account