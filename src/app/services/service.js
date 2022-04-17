import SnackbarUtils from 'app/views/dernek/components/SnackbarUtils';
import { db, storage } from '../../config'
import sha256 from 'sha256'
import { v4 as uuidv4 } from 'uuid';

//Doğrulama işlemleri
export function tcNoValidate(tcNo) {
    tcNo = tcNo.toString();
    if (tcNo.length !== 11) return false;
    if (tcNo[0] === '0') return false;
    let tekToplam = 0, ciftToplam = 0, genelToplam = 0;
    for (let i = 0; i < tcNo.length - 2; i++) {
        if (i % 2 === 0) {
            tekToplam += parseInt(tcNo[i]);
        } else {
            ciftToplam += parseInt(tcNo[i]);
        }
        genelToplam += parseInt(tcNo[i])
    }
    if (((tekToplam * 7) - ciftToplam) % 10 !== parseInt(tcNo[tcNo.length - 2])) return false;
    genelToplam += parseInt(tcNo[9]);
    if (genelToplam % 10 !== parseInt(tcNo[10])) return false;
    return true;
}

//Get İşlemleri

export const getLastUserId = (SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('users').orderBy('registerNo', 'desc').limit(1).get().then((querySnapshot) => {
            SuccessOperation({ lastUserId: querySnapshot.docs[0].data().registerNo })
        }).catch((error) => {
            FailedOperation(error);
        });
    }
}

//Admin İşlemleri

export const getAdminList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').where("userType", "==", "admin").where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const adminList = [];
            querySnapshot.forEach(function (doc) {
                adminList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ adminList: adminList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerAdmin = (admin, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(admin.idNo)) {
            db.collection('users').where("idNo", "==", admin.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    db.collection('users').where("registerNo", '==', admin.registerNo).get().then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            const refDatabase = db.collection('users');

                            refDatabase.add({
                                registerNo: admin.registerNo,
                                idNo: admin.idNo,
                                city: admin.city,
                                name: admin.name,
                                surname: admin.surname,
                                password: sha256(admin.password),
                                registerDate: new Date(),
                                userType: "admin",
                                status: 1,
                            }).then(() => {
                                SnackbarUtils.success('Başarıyla eklendi!');
                                SuccessOperation({});
                            }).catch(error => {
                                console.log("================>I'm in error<================", error)
                                FailedOperation({ errorMsg: error });
                            });
                        }
                        else {
                            SnackbarUtils.error('Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!');
                            FailedOperation({ errorMsg: 'Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!' });
                        }
                    })
                } else {
                    SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                    FailedOperation({ errorMsg: 'Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!' });
                }
            })
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const updateAdmin = (admin, adminId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update(Object.assign({
            idNo: admin.idNo,
            city: admin.city,
            name: admin.name,
            surname: admin.surname,
            updateDate: new Date(),
        }, admin.password !== "" && { password: sha256(admin.password) })).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const deleteAdmin = (adminId, reason, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update({
            status: 0,
            deleteInfo: {
                deleteDate: reason.exitDate,
                deleteReason: reason.exitReason
            }
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


//User İşlemleri
export const getUserList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').where("userType", "==", "user").where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const userList = [];
            querySnapshot.forEach(function (doc) {
                userList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ userList: userList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerUser = (user, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(user.idNo)) {
            db.collection('users').where("idNo", "==", user.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    db.collection('users').where("registerNo", '==', user.registerNo).get().then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            if (user.profilePicture !== undefined) {
                                if (user.profilePicture.size < 5242880) {
                                    const fileName = `${uuidv4()}.jpg`;
                                    const storageRef = storage.ref(`ProfilePictures/${fileName}`);
                                    storageRef.put(user.profilePicture).then((snapshot) => {
                                        snapshot.ref.getDownloadURL().then((url) => {
                                            const refDatabase = db.collection('users');
                                            console.log(url)
                                            refDatabase.add(Object.assign({
                                                registerNo: user.registerNo,
                                                registerDate: user.registerDate,
                                                userPosition: user.userPosition,
                                                idNo: user.idNo,
                                                name: user.name,
                                                surname: user.surname,
                                                fatherName: user.fatherName,
                                                motherName: user.motherName,
                                                placeOfBirth: user.placeOfBirth,
                                                birthday: user.birthday,
                                                birthCity: user.birthCity,
                                                birthCounty: user.birthCounty,
                                                birthDistrict: user.birthDistrict,
                                                maritalStatus: user.maritalStatus,
                                                bloodGroup: user.bloodGroup,
                                                profilePicture: url,
                                                liveCity: user.liveCity,
                                                liveCounty: user.liveCounty,
                                                liveDistrict: user.liveDistrict,
                                                liveStreet: user.liveStreet,
                                                liveBuildingNo: user.liveBuildingNo,
                                                email: user.email,
                                                education: user.education,
                                                foreignLanguage: user.foreignLanguage,
                                                mobilePhone: user.mobilePhone,
                                                status: 1,
                                                userType: "user",
                                            },
                                                user.businessPhone !== "" && { businessPhone: user.businessPhone },
                                                user.businessAddress !== "" && { businessAddress: user.businessAddress },
                                                user.job !== "" && { job: user.job },
                                                user.description !== "" && { description: user.description },
                                                user.facebook !== "" && { facebook: user.facebook },
                                                user.twitter !== "" && { twitter: user.twitter },
                                                user.instagram !== "" && { instagram: user.instagram },
                                            )).then(() => {
                                                SnackbarUtils.success('Başarıyla eklendi!');
                                                SuccessOperation({});
                                            }).catch(error => {
                                                console.log("================>I'm in error<================", error)
                                                FailedOperation({ errorMsg: error });
                                            });
                                        });
                                    });
                                } else {
                                    SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
                                }
                            } else {
                                SnackbarUtils.error("Öncelikle bir profil fotoğrafı seçmelisiniz!");
                            }
                        }
                        else {
                            SnackbarUtils.error('Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!');
                            FailedOperation({ errorMsg: 'Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!' });
                        }
                    })
                } else {
                    SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                    FailedOperation({ errorMsg: 'Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!' });
                }
            })
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const updateUser = (admin, adminId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update(Object.assign({
            registerNo: admin.registerNo,
            idNo: admin.idNo,
            city: admin.city,
            name: admin.name,
            surname: admin.surname,
            updateDate: new Date(),
        }, admin.password !== "" && { password: sha256(admin.password) })).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const deleteUser = (adminId, reason, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update({
            status: 0,
            deleteInfo: {
                deleteDate: reason.exitDate,
                deleteReason: reason.exitReason
            }
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}
