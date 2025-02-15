import {Button, Card, CardBody, Form} from "react-bootstrap";
import Postcode from "@/components/auth/DaumAddress.jsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import NameSection from "@/components/auth/register/NameSection.jsx";
import TelSection from "@/components/auth/register/TelSection.jsx";
import {removeProfile, getProfile, updateProfile} from "@/api/auth/profile.js";
import useAuthStore from "@/zustand/authStore.js";

const ChangeInfo = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        trigger,
        clearErrors
    } = useForm();

    const navigate = useNavigate();
    const [isAddressChanged, setIsAddressChanged] = useState(false);
    const address = watch('address');
    const initialName = useRef('');
    const emailRef = useRef('');
    const auth = useAuthStore();

    useEffect(() => {
        (async () => {
            return await getProfile();
        })().then((response) => {
            setValue('username', response.name);
            initialName.current = response.name;
            setValue('address', response.addr);
            setValue('postcode', response.postcode);
            setValue('tel', response.tel);
            emailRef.current = response.email;
        });
    }, [setValue]);

    const onSubmit = async (data) => {
        if (window.confirm('회원정보를 수정하시겠습니까?')) {
            try {
                await updateProfile(data);
                await auth.initializeAuth();
                navigate("/profile", {replace: true});
            } catch (error) {
                alert(error.response?.data?.error || '회원정보 수정 중 오류가 발생했습니다.');
            }
        }
    }

    const handleRemoveProfile = async () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const response = await removeProfile();
            if (response) {
                alert("계정이 삭제되었습니다.");
                navigate("/", {replace: true});
            }
        }
    }

    return (
        <main>
            <section className="section section-shaped section-lg">
                <div className="shape shape-style-1 bg-gradient-default">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <div className="d-flex flex-column align-items-center" style={{maxWidth: '600px', margin: '0 auto'}}>
                    <Card className="bg-secondary shadow border-0 w-100">
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column"
                                  style={{gap: '1rem'}}>
                                <NameSection
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                    trigger={trigger}
                                    initialValue={initialName.current}
                                />

                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        disabled
                                        defaultValue={emailRef.current}
                                    />
                                </Form.Group>

                                <TelSection
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                />

                                <Form.Group className="mb-3">
                                    <div className="d-flex mb-2" style={{gap: '1rem'}}>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            placeholder="우편번호"
                                            name={register('postcode').name}
                                            onChange={register('postcode').onChange}
                                            onBlur={register('postcode').onBlur}
                                            ref={register('postcode').ref}
                                        />
                                        <Postcode
                                            setAddress={(address) => {
                                                setValue('address', address);
                                                setValue('addressDetail', '');
                                                setIsAddressChanged(true);
                                            }}
                                            setPostCode={(postcode) => setValue('postcode', postcode)}
                                            buttonName="주소 변경"
                                        />
                                    </div>

                                    <Form.Control
                                        className="mb-2"
                                        placeholder="주소"
                                        disabled
                                        {...register('address')}
                                    />

                                    {isAddressChanged && address && (
                                        <Form.Control
                                            placeholder="상세 주소"
                                            {...register('addressDetail')}
                                        />
                                    )}
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button className={"bg-danger"} type={"button"}
                                            onClick={handleRemoveProfile}
                                    >
                                        탈퇴
                                    </Button>
                                    <div className="d-flex" style={{gap: '.5rem'}}>
                                        <Button
                                            color="primary"
                                            type="submit"
                                        >
                                            수정
                                        </Button>
                                        <Button
                                            className={"bg-gray-dark"}
                                            type="button"
                                            onClick={() => navigate("/profile", {replace: true})}
                                        >
                                            취소
                                        </Button></div>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </section>
        </main>
    )
}

export default ChangeInfo;